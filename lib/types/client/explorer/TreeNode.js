import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Single tree node with lazy children; rename/create via inline edit + context menu.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { ExplorerContextMenu } from "./ExplorerContextMenu.js";
import { InlineNameInput } from "./InlineNameInput.js";
import { scrollTreeRowIntoView } from "./scroll-tree-row.js";
import css from './explorer.module.css';
function FolderIcon() {
    return (_jsx("svg", { className: css.icon, viewBox: "0 0 16 16", "aria-hidden": "true", children: _jsx("path", { fill: "currentColor", d: "M1.5 3.5h5l1 1.5h7v8h-13z", opacity: "0.85" }) }));
}
function FileIcon() {
    return (_jsx("svg", { className: css.icon, viewBox: "0 0 16 16", "aria-hidden": "true", children: _jsx("path", { fill: "currentColor", d: "M4 1.5h5.5L13 5v9.5H4z", opacity: "0.75" }) }));
}
function Chevron({ open }) {
    return (_jsx("svg", { className: css.chevron, viewBox: "0 0 16 16", "aria-hidden": "true", style: { transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 0.12s' }, children: _jsx("path", { fill: "currentColor", d: "M6 3l5 5-5 5z" }) }));
}
function joinPath(parent, name) {
    return parent === '' ? name : `${parent}/${name}`;
}
function parentPath(path) {
    return path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : '';
}
/**
 * Render one filesystem entry; directories expand lazily via `api.list`.
 */
export function TreeNode(props) {
    const { entry, depth, api, t, activePath, selectedPath, onSelect, onOpenFile, onError, onTreeMutated, refreshToken, expandSignal, collapseSignal, } = props;
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState(null);
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState(null);
    const [renaming, setRenaming] = useState(false);
    const [childDraft, setChildDraft] = useState(null);
    const loadChildren = useCallback(async () => {
        setLoading(true);
        const result = await api.list(entry.path);
        setLoading(false);
        if (!result.ok) {
            onError(result.error.message);
            return;
        }
        setChildren(result.value.entries);
    }, [api, entry.path, onError]);
    useEffect(() => {
        if (!expanded)
            return;
        void loadChildren();
    }, [expanded, refreshToken, loadChildren]);
    useEffect(() => {
        if (expandSignal === 0 || entry.kind !== 'dir')
            return;
        setExpanded(true);
    }, [expandSignal, entry.kind]);
    useEffect(() => {
        if (collapseSignal === 0 || entry.kind !== 'dir')
            return;
        setExpanded(false);
    }, [collapseSignal, entry.kind]);
    const toggleExpand = () => {
        if (entry.kind !== 'dir')
            return;
        setExpanded((v) => !v);
    };
    const onRowClick = () => {
        if (renaming)
            return;
        onSelect(entry.path);
        if (entry.kind === 'dir') {
            toggleExpand();
            return;
        }
        onOpenFile(entry.path);
    };
    const commitRename = async (name) => {
        setRenaming(false);
        if (name === entry.name)
            return;
        const to = joinPath(parentPath(entry.path), name);
        const result = await api.rename(entry.path, to);
        if (!result.ok) {
            onError(result.error.message);
            return;
        }
        onSelect(to);
        onTreeMutated();
    };
    const commitChildCreate = async (kind, name) => {
        setChildDraft(null);
        const path = joinPath(entry.path, name);
        if (kind === 'file') {
            const result = await api.write(path, '');
            if (!result.ok) {
                onError(result.error.message);
                return;
            }
            onTreeMutated();
            onSelect(path);
            onOpenFile(path);
            return;
        }
        const result = await api.mkdir(path);
        if (!result.ok) {
            onError(result.error.message);
            return;
        }
        onSelect(path);
        onTreeMutated();
    };
    const startChildDraft = (kind) => {
        setExpanded(true);
        setChildDraft(kind);
    };
    const remove = async () => {
        if (!window.confirm(t('confirmDelete', { name: entry.name })))
            return;
        const result = await api.unlink(entry.path);
        if (!result.ok) {
            onError(result.error.message);
            return;
        }
        onTreeMutated();
    };
    const revealInFileManager = async () => {
        const result = await api.revealPath(entry.path);
        if (!result.ok)
            onError(result.error.message);
    };
    const selected = entry.path === selectedPath;
    const opened = entry.path === activePath;
    const rowRef = useRef(null);
    const rowClass = [
        css.row,
        selected ? css.rowSelected : '',
        opened && !selected ? css.rowOpened : '',
    ].filter(Boolean).join(' ');
    useEffect(() => {
        if (!selected)
            return;
        const row = rowRef.current;
        if (row === null)
            return;
        const id = window.requestAnimationFrame(() => {
            scrollTreeRowIntoView(row);
        });
        return () => window.cancelAnimationFrame(id);
    }, [selected, expanded]);
    const menuItems = entry.kind === 'dir'
        ? [
            {
                id: 'expand-toggle',
                label: expanded ? t('collapse') : t('expand'),
                onSelect: () => {
                    toggleExpand();
                },
            },
            {
                id: 'reveal',
                label: t('revealPathInFileManager'),
                onSelect: () => {
                    void revealInFileManager();
                },
            },
            {
                id: 'new-file',
                label: t('newFile'),
                onSelect: () => {
                    startChildDraft('file');
                },
            },
            {
                id: 'new-folder',
                label: t('newFolder'),
                onSelect: () => {
                    startChildDraft('dir');
                },
            },
            {
                id: 'rename',
                label: t('rename'),
                onSelect: () => {
                    setRenaming(true);
                },
            },
            {
                id: 'delete',
                label: t('delete'),
                danger: true,
                onSelect: () => {
                    void remove();
                },
            },
        ]
        : [
            {
                id: 'reveal',
                label: t('revealPathInFileManager'),
                onSelect: () => {
                    void revealInFileManager();
                },
            },
            {
                id: 'rename',
                label: t('rename'),
                onSelect: () => {
                    setRenaming(true);
                },
            },
            {
                id: 'delete',
                label: t('delete'),
                danger: true,
                onSelect: () => {
                    void remove();
                },
            },
        ];
    return (_jsxs("li", { children: [renaming ? (_jsx(InlineNameInput, { depth: depth, kind: entry.kind, initialValue: entry.name, placeholder: t('promptRename'), ariaLabel: t('rename'), onCancel: () => setRenaming(false), onCommit: (name) => {
                    void commitRename(name);
                } })) : (_jsxs("div", { ref: rowRef, className: rowClass, style: { paddingLeft: 8 + depth * 12 }, title: entry.path || entry.name, role: "treeitem", "aria-selected": selected, "aria-expanded": entry.kind === 'dir' ? expanded : undefined, onClick: onRowClick, onContextMenu: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onSelect(entry.path);
                    setMenu({ x: event.clientX, y: event.clientY });
                }, onKeyDown: (event) => {
                    if (entry.kind === 'dir' && event.key === 'ArrowRight') {
                        event.preventDefault();
                        onSelect(entry.path);
                        setExpanded(true);
                        return;
                    }
                    if (entry.kind === 'dir' && event.key === 'ArrowLeft') {
                        event.preventDefault();
                        onSelect(entry.path);
                        setExpanded(false);
                        return;
                    }
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        onRowClick();
                    }
                    if (event.key === 'F2') {
                        event.preventDefault();
                        onSelect(entry.path);
                        setRenaming(true);
                    }
                }, tabIndex: 0, children: [entry.kind === 'dir' ? (_jsx("button", { type: "button", className: css.chevronBtn, "aria-label": expanded ? t('collapse') : t('expand'), tabIndex: -1, onClick: (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            onSelect(entry.path);
                            toggleExpand();
                        }, children: _jsx(Chevron, { open: expanded }) })) : (_jsx("span", { className: css.chevronPlaceholder })), entry.kind === 'dir' ? _jsx(FolderIcon, {}) : _jsx(FileIcon, {}), _jsxs("span", { className: css.label, children: [entry.name, loading ? '…' : ''] })] })), menu !== null ? (_jsx(ExplorerContextMenu, { x: menu.x, y: menu.y, onClose: () => setMenu(null), items: menuItems })) : null, entry.kind === 'dir' && expanded ? (_jsxs("ul", { className: css.children, role: "group", children: [childDraft !== null ? (_jsx("li", { children: _jsx(InlineNameInput, { depth: depth + 1, kind: childDraft, initialValue: "", placeholder: childDraft === 'file' ? t('promptNewFile') : t('promptNewFolder'), ariaLabel: childDraft === 'file' ? t('newFile') : t('newFolder'), onCancel: () => setChildDraft(null), onCommit: (name) => {
                                void commitChildCreate(childDraft, name);
                            } }) }, `draft-${childDraft}`)) : null, children !== null
                        ? children.map((child) => (_jsx(TreeNode, { entry: child, depth: depth + 1, api: api, t: t, activePath: activePath, selectedPath: selectedPath, onSelect: onSelect, onOpenFile: onOpenFile, onError: onError, onTreeMutated: onTreeMutated, refreshToken: refreshToken, expandSignal: expandSignal, collapseSignal: collapseSignal }, child.path)))
                        : null, children !== null && children.length === 0 && childDraft === null ? (_jsx("li", { className: css.emptyChild, style: { paddingLeft: 8 + (depth + 1) * 12 }, children: t('emptyWorkspace') })) : null] })) : null] }));
}
//# sourceMappingURL=TreeNode.js.map