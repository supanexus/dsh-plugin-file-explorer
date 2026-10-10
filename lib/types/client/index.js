import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Client half: Files tab fills the conversation viewArea (composer-overlay
 * contract) with a center tree | editor split. Left sidebar stays the
 * official workspace / conversation list (no sidebar.workspaces shadow).
 */
import { Component, useCallback, useLayoutEffect, useRef, useState, } from 'react';
import { FILE_EXPLORER_SETTINGS_NS, } from "../shared/settings-contract.js";
import { createExplorerApi, TYPERT_REMOTE } from "./rpc.js";
import { TabsStore } from "./state/tabs.js";
import { BuffersStore } from "./state/buffers.js";
import { MdModeStore } from "./state/md-mode.js";
import { ExplorerModeStore } from "./state/mode.js";
import { ExplorerPanel } from "./explorer/ExplorerPanel.js";
import { EditorSurface, requestOpenPath } from "./editor/EditorSurface.js";
import { ExplorerSettingsCard } from "./settings/ExplorerSettingsCard.js";
import { dictionaries, explorerT, NS } from "./locales.js";
import { useExplorerT } from "./use-explorer-t.js";
import { installOpenLinksInterceptor } from "./open-links.js";
import { installSessionRootPin } from "./session-pin.js";
import css from './files-view.module.css';
const PACKAGE = '@supanexus/dsh-plugin-file-explorer';
export const VIEW_ID = 'file-explorer';
/** Required client services before apply runs. */
export const inject = [
    'slots',
    'remote',
    'locale',
    'connection',
    'configForms',
];
/**
 * Mount remotes and register UI slots.
 * @param ctx - Client root context.
 */
export async function apply(ctx) {
    const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE);
    ctx.effect(() => disposeRemote, 'supanexus-file-explorer: remote');
    ctx.effect(() => ctx.locale.register(NS, dictionaries), 'supanexus-file-explorer: dictionaries');
    const settings = ctx.configForms.get(FILE_EXPLORER_SETTINGS_NS);
    const tabs = new TabsStore();
    const buffers = new BuffersStore();
    const mdModes = new MdModeStore();
    const mode = new ExplorerModeStore();
    ctx.inject(['remote.explorerFs'], (remoteCtx) => {
        const api = createExplorerApi(remoteCtx);
        remoteCtx.effect(() => installOpenLinksInterceptor(settings), 'supanexus-file-explorer: open-links');
        remoteCtx.inject(['sessions', 'uiSession'], (sessionCtx) => {
            sessionCtx.effect(() => installSessionRootPin(sessionCtx, api, mode), 'supanexus-file-explorer: session-pin');
        });
        // Files view owns the full column — hide the resident InputBar via the
        // conversation.composer chain (overlay keeps the draft mounted off-screen).
        // Priority 50: after approval/questions/subagent takeovers so those still win.
        remoteCtx.effect(() => {
            let disposeComposer;
            const syncComposer = () => {
                const enabled = mode.getSnapshot();
                if (disposeComposer !== undefined) {
                    try {
                        disposeComposer();
                    }
                    catch (error) {
                        console.error('[file-explorer] composer dispose failed', error);
                    }
                    disposeComposer = undefined;
                }
                if (!enabled)
                    return;
                try {
                    disposeComposer = remoteCtx.effect(() => remoteCtx.slots.register({
                        name: 'conversation.composer',
                        priority: 50,
                        registrant: PACKAGE,
                        select: () => ({ hide: true }),
                    }, () => null), 'supanexus-file-explorer: composer-hide');
                }
                catch (error) {
                    console.error('[file-explorer] conversation.composer register failed', error);
                }
            };
            syncComposer();
            const unsub = mode.subscribe(syncComposer);
            return () => {
                unsub();
                if (disposeComposer !== undefined) {
                    try {
                        disposeComposer();
                    }
                    catch {
                        // ignore
                    }
                    disposeComposer = undefined;
                }
            };
        }, 'supanexus-file-explorer: mode→composer');
        remoteCtx.slots.inject('conversation.view', () => remoteCtx.slots.register({
            name: 'conversation.view',
            id: VIEW_ID,
            order: 40,
            locale: NS,
            label: () => explorerT(remoteCtx.locale.getSnapshot().active)('viewLabel'),
            registrant: PACKAGE,
        }, () => (_jsx(FilesView, { ctx: remoteCtx, mode: mode, api: api, tabs: tabs, buffers: buffers, mdModes: mdModes }))));
        const t = remoteCtx.locale.bind(NS);
        remoteCtx.effect(() => remoteCtx.configForms.whileServed([FILE_EXPLORER_SETTINGS_NS], () => remoteCtx.slots.inject('plugins.item', () => remoteCtx.slots.register({
            name: 'plugins.item',
            id: 'file-explorer',
            order: 45,
            label: () => t('settingsTitle'),
            locale: NS,
            registrant: PACKAGE,
        }, (props) => (_jsx(ExplorerSettingsCard, { ctx: remoteCtx, scope: settings, ...props }))))), 'supanexus-file-explorer: plugins.item');
    });
}
class FilesViewBoundary extends Component {
    state = { message: null };
    static getDerivedStateFromError(error) {
        return { message: error.message };
    }
    componentDidCatch(error, info) {
        console.error('[file-explorer] FilesView crash', error, info);
    }
    render() {
        if (this.state.message !== null) {
            return (_jsx("div", { className: css.shell, "data-file-explorer-view": "", "data-conversation-composer-overlay": "", children: _jsx("div", { className: css.crash, children: this.state.message }) }));
        }
        return this.props.children;
    }
}
const TREE_WIDTH_KEY = 'supanexus-file-explorer:tree-width';
const TREE_WIDTH_DEFAULT = 280;
const TREE_WIDTH_MIN = 160;
const TREE_WIDTH_MAX = 720;
function readTreeWidth() {
    try {
        const raw = window.localStorage.getItem(TREE_WIDTH_KEY);
        if (raw === null)
            return TREE_WIDTH_DEFAULT;
        const n = Number(raw);
        if (!Number.isFinite(n))
            return TREE_WIDTH_DEFAULT;
        return Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, Math.round(n)));
    }
    catch {
        return TREE_WIDTH_DEFAULT;
    }
}
/**
 * Files conversation view. The root MUST carry
 * `data-conversation-composer-overlay` so ConversationRoot stretches
 * `.viewArea`; without it the pane collapses to zero height.
 */
function FilesView(props) {
    const { ctx, mode, api, tabs, buffers, mdModes } = props;
    const t = useExplorerT(ctx);
    const [treeWidth, setTreeWidth] = useState(TREE_WIDTH_DEFAULT);
    const dragRef = useRef(null);
    useLayoutEffect(() => {
        setTreeWidth(readTreeWidth());
    }, []);
    useLayoutEffect(() => {
        mode.setEnabled(true);
        return () => {
            mode.setEnabled(false);
        };
    }, [mode]);
    const onResizePointerDown = useCallback((event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = { startX: event.clientX, startWidth: treeWidth };
    }, [treeWidth]);
    const onResizePointerMove = useCallback((event) => {
        const drag = dragRef.current;
        if (drag === null)
            return;
        const next = Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, drag.startWidth + (event.clientX - drag.startX)));
        setTreeWidth(next);
    }, []);
    const onResizePointerUp = useCallback((event) => {
        if (dragRef.current === null)
            return;
        dragRef.current = null;
        try {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        catch {
            // ignore
        }
        setTreeWidth((width) => {
            try {
                window.localStorage.setItem(TREE_WIDTH_KEY, String(width));
            }
            catch {
                // ignore
            }
            return width;
        });
    }, []);
    return (_jsx(FilesViewBoundary, { children: _jsx("div", { className: css.shell, "data-file-explorer-view": "", "data-conversation-composer-overlay": "", children: _jsxs("div", { className: css.filesView, children: [_jsxs("aside", { className: css.treeCol, style: { width: treeWidth }, "aria-label": t('treeAriaLabel'), children: [_jsx(ExplorerPanel, { ctx: ctx, api: api, tabs: tabs, onOpenFile: (path) => {
                                    requestOpenPath(path);
                                } }), _jsx("div", { className: css.treeResize, role: "separator", "aria-orientation": "vertical", "aria-valuenow": treeWidth, "aria-valuemin": TREE_WIDTH_MIN, "aria-valuemax": TREE_WIDTH_MAX, onPointerDown: onResizePointerDown, onPointerMove: onResizePointerMove, onPointerUp: onResizePointerUp, onPointerCancel: onResizePointerUp })] }), _jsx("div", { className: css.editorCol, children: _jsx(EditorSurface, { ctx: ctx, api: api, tabs: tabs, buffers: buffers, mdModes: mdModes }) })] }) }) }));
}
//# sourceMappingURL=index.js.map