import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Tab strip for open editor buffers, with close + context-menu actions.
 */
import { useCallback, useState } from 'react';
import { ExplorerContextMenu } from "../explorer/ExplorerContextMenu.js";
import css from './editor.module.css';
/**
 * Horizontal list of open paths with dirty marks, close buttons, and
 * right-click: close / close to the right / close all.
 */
export function TabStrip(props) {
    const { tabs, activePath, buffers, t, onActivate, onClose, onClosePaths } = props;
    const [menu, setMenu] = useState(null);
    const closeMenu = useCallback(() => {
        setMenu(null);
    }, []);
    const menuItems = menu === null
        ? []
        : (() => {
            const index = tabs.findIndex((tab) => tab.path === menu.path);
            const toRight = index >= 0 ? tabs.slice(index + 1).map((tab) => tab.path) : [];
            return [
                {
                    id: 'close',
                    label: t('tabClose'),
                    onSelect: () => {
                        onClose(menu.path);
                    },
                },
                {
                    id: 'close-right',
                    label: t('tabCloseRight'),
                    disabled: toRight.length === 0,
                    onSelect: () => {
                        if (toRight.length === 0)
                            return;
                        onClosePaths(toRight);
                    },
                },
                {
                    id: 'close-all',
                    label: t('tabCloseAll'),
                    onSelect: () => {
                        onClosePaths(tabs.map((tab) => tab.path));
                    },
                },
            ];
        })();
    return (_jsxs("div", { className: css.tabs, role: "tablist", children: [tabs.map((tab) => {
                const active = tab.path === activePath;
                const dirty = buffers.isDirty(tab.path);
                return (_jsxs("button", { type: "button", role: "tab", "aria-selected": active, className: active ? `${css.tab} ${css.tabActive}` : css.tab, onClick: () => onActivate(tab.path), onContextMenu: (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onActivate(tab.path);
                        setMenu({ x: event.clientX, y: event.clientY, path: tab.path });
                    }, children: [_jsxs("span", { children: [tab.title, dirty ? _jsx("span", { className: css.dirtyMark, children: " \u2022" }) : null] }), _jsx("span", { className: css.closeBtn, role: "button", tabIndex: 0, "aria-label": t('tabClose'), onClick: (event) => {
                                event.stopPropagation();
                                onClose(tab.path);
                            }, onKeyDown: (event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    onClose(tab.path);
                                }
                            }, children: "\u00D7" })] }, tab.path));
            }), menu !== null ? (_jsx(ExplorerContextMenu, { x: menu.x, y: menu.y, items: menuItems, onClose: closeMenu })) : null] }));
}
//# sourceMappingURL=TabStrip.js.map