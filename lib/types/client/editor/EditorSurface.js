import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Center-column editor: tabs + Monaco/textarea + markdown preview.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, } from 'react';
import { isMarkdownPath } from "../state/md-mode.js";
import { useExplorerT } from "../use-explorer-t.js";
import { languageForPath, loadMonaco } from "./monaco-loader.js";
import { EDITOR_CUSTOM_THEME_ID, EditorAppearanceStore } from "./appearance.js";
import { applyMonacoAppearance } from "./apply-monaco-appearance.js";
import { AppearanceMenu } from "./AppearanceMenu.js";
import { TabStrip } from "./TabStrip.js";
import { MarkdownPreview } from "./MarkdownPreview.js";
import css from './editor.module.css';
const appearanceStore = new EditorAppearanceStore();
/**
 * Multi-tab editor surface bound to explorer RPC + local stores.
 */
export function EditorSurface(props) {
    const { ctx, api, tabs, buffers, mdModes } = props;
    const t = useExplorerT(ctx);
    const tabState = useSyncExternalStore(tabs.subscribe, tabs.getSnapshot);
    useSyncExternalStore(buffers.subscribe, () => buffers.get(tabState.activePath ?? '')?.content ?? '');
    useSyncExternalStore(mdModes.subscribe, () => (tabState.activePath === null ? 'source' : mdModes.get(tabState.activePath)));
    const appearance = useSyncExternalStore(appearanceStore.subscribe, appearanceStore.getSnapshot);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [monacoReady, setMonacoReady] = useState(false);
    const [monacoFailed, setMonacoFailed] = useState(false);
    const [appearanceOpen, setAppearanceOpen] = useState(false);
    const hostRef = useRef(null);
    const editorRef = useRef(null);
    const applyingExternal = useRef(false);
    const activePath = tabState.activePath;
    const buffer = activePath === null ? undefined : buffers.get(activePath);
    const mdMode = activePath !== null && isMarkdownPath(activePath)
        ? mdModes.get(activePath)
        : 'source';
    useLayoutEffect(() => {
        appearanceStore.hydrate();
    }, []);
    const openPath = useCallback(async (path) => {
        tabs.open(path);
        if (buffers.get(path) !== undefined)
            return;
        const result = await api.read(path);
        if (!result.ok) {
            setError(result.error.message);
            tabs.close(path);
            return;
        }
        setError(null);
        buffers.load(path, result.value.content);
    }, [api, buffers, tabs]);
    useEffect(() => {
        const handler = (event) => {
            const detail = event.detail;
            if (detail?.path)
                void openPath(detail.path);
        };
        window.addEventListener('file-explorer:open', handler);
        return () => window.removeEventListener('file-explorer:open', handler);
    }, [openPath]);
    const saveActive = useCallback(async () => {
        if (activePath === null)
            return;
        const entry = buffers.get(activePath);
        if (entry === undefined)
            return;
        const result = await api.write(activePath, entry.content);
        if (!result.ok) {
            setError(result.error.message);
            return;
        }
        buffers.markSaved(activePath);
        setError(null);
        setStatus(t('editorSaved'));
        window.setTimeout(() => setStatus(''), 1200);
    }, [activePath, api, buffers, t]);
    useEffect(() => {
        const onKey = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
                event.preventDefault();
                void saveActive();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [saveActive]);
    useEffect(() => {
        let cancelled = false;
        void loadMonaco()
            .then(() => {
            if (!cancelled)
                setMonacoReady(true);
        })
            .catch(() => {
            if (!cancelled)
                setMonacoFailed(true);
        });
        return () => {
            cancelled = true;
        };
    }, []);
    useEffect(() => {
        if (!monacoReady || monacoFailed || hostRef.current === null || activePath === null) {
            editorRef.current?.dispose();
            editorRef.current = null;
            return;
        }
        if (mdMode === 'preview') {
            editorRef.current?.dispose();
            editorRef.current = null;
            return;
        }
        let disposed = false;
        const snap = appearanceStore.getSnapshot();
        void loadMonaco().then((monaco) => {
            if (disposed || hostRef.current === null)
                return;
            editorRef.current?.dispose();
            const content = buffers.get(activePath)?.content ?? '';
            applyMonacoAppearance(monaco, snap);
            const editor = monaco.editor.create(hostRef.current, {
                value: content,
                language: languageForPath(activePath),
                automaticLayout: true,
                minimap: { enabled: false },
                fontSize: snap.fontSize,
                theme: snap.customBackground === null ? snap.theme : EDITOR_CUSTOM_THEME_ID,
                scrollBeyondLastLine: false,
            });
            editorRef.current = editor;
            editor.onDidChangeModelContent(() => {
                if (applyingExternal.current)
                    return;
                buffers.setContent(activePath, editor.getValue());
            });
        });
        return () => {
            disposed = true;
            editorRef.current?.dispose();
            editorRef.current = null;
        };
    }, [monacoReady, monacoFailed, activePath, mdMode, buffers]);
    // Live-apply theme / custom bg / font without remounting the model.
    useEffect(() => {
        if (!monacoReady || monacoFailed)
            return;
        void loadMonaco().then((monaco) => {
            applyMonacoAppearance(monaco, appearance);
            editorRef.current?.updateOptions({ fontSize: appearance.fontSize });
        });
    }, [appearance.theme, appearance.customBackground, appearance.fontSize, monacoReady, monacoFailed]);
    useEffect(() => {
        if (activePath === null || editorRef.current === null)
            return;
        const next = buffers.get(activePath)?.content ?? '';
        if (editorRef.current.getValue() === next)
            return;
        applyingExternal.current = true;
        try {
            editorRef.current.setValue(next);
        }
        finally {
            applyingExternal.current = false;
        }
    }, [activePath, buffer?.content, buffers]);
    const dropTab = useCallback((path) => {
        tabs.close(path);
        buffers.drop(path);
        mdModes.drop(path);
    }, [buffers, mdModes, tabs]);
    const onClose = useCallback((path) => {
        if (buffers.isDirty(path)) {
            if (!window.confirm(t('confirmCloseDirty')))
                return;
        }
        dropTab(path);
    }, [buffers, dropTab, t]);
    const onClosePaths = useCallback((paths) => {
        if (paths.length === 0)
            return;
        const dirty = paths.some((path) => buffers.isDirty(path));
        if (dirty && !window.confirm(t('confirmCloseDirty')))
            return;
        for (const path of paths)
            dropTab(path);
    }, [buffers, dropTab, t]);
    if (tabState.open.length === 0 || activePath === null) {
        return (_jsx("div", { className: css.surface, "data-file-explorer-editor": "", children: _jsx("div", { className: css.empty, children: t('editorEmpty') }) }));
    }
    return (_jsxs("div", { className: css.surface, "data-file-explorer-editor": "", children: [_jsx(TabStrip, { tabs: tabState.open, activePath: activePath, buffers: buffers, t: t, onActivate: (path) => tabs.activate(path), onClose: onClose, onClosePaths: onClosePaths }), error !== null ? _jsx("div", { className: css.errorBanner, children: error }) : null, _jsxs("div", { className: css.toolbar, children: [_jsx("button", { type: "button", className: css.toolBtn, onClick: () => void saveActive(), children: t('editorSave') }), isMarkdownPath(activePath) ? (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", className: mdMode === 'source' ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn, onClick: () => mdModes.set(activePath, 'source'), children: t('editorSource') }), _jsx("button", { type: "button", className: mdMode === 'preview' ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn, onClick: () => mdModes.set(activePath, 'preview'), children: t('editorPreview') })] })) : null, _jsx("span", { className: css.status, children: status || (monacoFailed ? t('editorTextareaMode') : '') }), _jsxs("div", { className: css.toolbarEnd, children: [_jsx("button", { type: "button", className: appearanceOpen ? `${css.toolBtn} ${css.toolBtnActive}` : css.toolBtn, "aria-expanded": appearanceOpen, "aria-haspopup": "dialog", onClick: () => setAppearanceOpen((open) => !open), children: t('editorAppearance') }), appearanceOpen ? (_jsx(AppearanceMenu, { t: t, appearance: appearance, store: appearanceStore, onClose: () => setAppearanceOpen(false) })) : null] })] }), _jsx("div", { className: css.pathBar, title: activePath, "aria-label": t('editorFilePath'), children: activePath }), _jsx("div", { className: css.body, children: mdMode === 'preview' ? (_jsx(MarkdownPreview, { content: buffer?.content ?? '' })) : monacoReady && !monacoFailed ? (_jsx("div", { className: css.monacoHost, ref: hostRef })) : (_jsx("textarea", { className: css.textarea, style: {
                        fontSize: appearance.fontSize,
                        ...(appearance.customBackground !== null
                            ? { background: appearance.customBackground }
                            : {}),
                    }, value: buffer?.content ?? '', onChange: (event) => buffers.setContent(activePath, event.target.value), spellCheck: false })) })] }));
}
/** Dispatch a cross-component open request. */
export function requestOpenPath(path) {
    window.dispatchEvent(new CustomEvent('file-explorer:open', { detail: { path } }));
}
//# sourceMappingURL=EditorSurface.js.map