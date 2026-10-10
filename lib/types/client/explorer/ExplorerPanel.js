import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Sidebar explorer panel: workspace header + icon actions + root listing.
 */
import { Component, useCallback, useEffect, useState, useSyncExternalStore, } from 'react';
import { subscribeRootPinned } from "../root-events.js";
import { useExplorerT } from "../use-explorer-t.js";
import { InlineNameInput } from "./InlineNameInput.js";
import { CollapseAllIconButton, ExpandAllIconButton, NewFileIconButton, NewFolderIconButton, RefreshIconButton, RevealIconButton, } from "./ToolbarIcons.js";
import { TreeNode } from "./TreeNode.js";
import css from './explorer.module.css';
class PanelBoundary extends Component {
    state = { message: null };
    static getDerivedStateFromError(error) {
        return { message: error.message };
    }
    componentDidCatch(error, info) {
        console.error('[file-explorer] panel crash', error, info);
    }
    render() {
        if (this.state.message !== null) {
            return _jsx("div", { className: css.errorBanner, children: this.state.message });
        }
        return this.props.children;
    }
}
/** Basename for display; browser bundle may not have node:path — keep a fallback. */
function workspaceLabel(root) {
    const normalized = root.replaceAll('\\', '/').replace(/\/+$/, '');
    const name = normalized.includes('/')
        ? normalized.slice(normalized.lastIndexOf('/') + 1)
        : normalized;
    return name || root || 'workspace';
}
/**
 * Root listing with create-file / create-dir actions.
 */
export function ExplorerPanel(props) {
    return (_jsx(PanelBoundary, { children: _jsx(ExplorerPanelInner, { ...props }) }));
}
function ExplorerPanelInner(props) {
    const { ctx, api, tabs, onOpenFile } = props;
    const t = useExplorerT(ctx);
    const activePath = useSyncExternalStore(tabs.subscribe, () => tabs.getSnapshot().activePath);
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [refreshToken, setRefreshToken] = useState(0);
    const [expandSignal, setExpandSignal] = useState(0);
    const [collapseSignal, setCollapseSignal] = useState(0);
    const [rootDraft, setRootDraft] = useState(null);
    const [selectedPath, setSelectedPath] = useState(null);
    const [rootPath, setRootPath] = useState('');
    useEffect(() => {
        if (activePath !== null)
            setSelectedPath(activePath);
    }, [activePath]);
    const reload = useCallback(async () => {
        const [listResult, rootResult] = await Promise.all([api.list(''), api.getRoot()]);
        if (rootResult.ok)
            setRootPath(rootResult.value.root);
        if (!listResult.ok) {
            setError(listResult.error.message);
            return;
        }
        setError(null);
        setEntries(listResult.value.entries);
    }, [api]);
    useEffect(() => {
        void reload();
    }, [reload, refreshToken]);
    useEffect(() => subscribeRootPinned(() => {
        setRefreshToken((n) => n + 1);
    }), []);
    const bump = () => {
        setRefreshToken((n) => n + 1);
    };
    const commitRootCreate = async (kind, name) => {
        setRootDraft(null);
        const path = name;
        if (kind === 'file') {
            const result = await api.write(path, '');
            if (!result.ok) {
                setError(result.error.message);
                return;
            }
            bump();
            setSelectedPath(path);
            onOpenFile(path);
            return;
        }
        const result = await api.mkdir(path);
        if (!result.ok) {
            setError(result.error.message);
            return;
        }
        bump();
        setSelectedPath(path);
    };
    const revealRoot = async () => {
        const result = await api.revealRoot();
        if (!result.ok)
            setError(result.error.message);
    };
    const title = workspaceLabel(rootPath);
    return (_jsxs("div", { className: css.panel, "data-file-explorer-panel": "", children: [_jsxs("div", { className: css.toolbar, children: [_jsx("div", { className: css.workspaceName, title: rootPath || undefined, children: title }), _jsxs("div", { className: css.toolbarActions, children: [_jsx(NewFileIconButton, { title: t('newFile'), onClick: () => setRootDraft('file') }), _jsx(NewFolderIconButton, { title: t('newFolder'), onClick: () => setRootDraft('dir') }), _jsx(ExpandAllIconButton, { title: t('expandAll'), onClick: () => setExpandSignal((n) => n + 1) }), _jsx(CollapseAllIconButton, { title: t('collapseAll'), onClick: () => setCollapseSignal((n) => n + 1) }), _jsx(RefreshIconButton, { title: t('refresh'), onClick: () => bump() }), _jsx(RevealIconButton, { title: t('openInFileManager'), onClick: () => void revealRoot() })] })] }), error !== null ? _jsx("div", { className: css.errorBanner, children: error }) : null, entries.length === 0 && rootDraft === null ? (_jsx("div", { className: css.empty, children: t('emptyWorkspace') })) : (_jsx("div", { className: css.treeScroll, "data-file-explorer-tree-scroll": "", children: _jsxs("ul", { className: css.tree, role: "tree", children: [rootDraft !== null ? (_jsx("li", { children: _jsx(InlineNameInput, { depth: 0, kind: rootDraft, initialValue: "", placeholder: rootDraft === 'file' ? t('promptNewFile') : t('promptNewFolder'), ariaLabel: rootDraft === 'file' ? t('newFile') : t('newFolder'), onCancel: () => setRootDraft(null), onCommit: (name) => {
                                    void commitRootCreate(rootDraft, name);
                                } }) }, `draft-${rootDraft}`)) : null, entries.map((entry) => (_jsx(TreeNode, { entry: entry, depth: 0, api: api, t: t, activePath: activePath, selectedPath: selectedPath, onSelect: setSelectedPath, onOpenFile: onOpenFile, onError: setError, onTreeMutated: bump, refreshToken: refreshToken, expandSignal: expandSignal, collapseSignal: collapseSignal }, entry.path)))] }) }))] }));
}
//# sourceMappingURL=ExplorerPanel.js.map