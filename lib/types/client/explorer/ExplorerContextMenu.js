import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Floating context menu for explorer rows (rename / delete).
 */
import { useEffect, useRef } from 'react';
import css from './explorer.module.css';
/**
 * Fixed-position menu; closes on outside click, Escape, or item select.
 */
export function ExplorerContextMenu(props) {
    const { x, y, items, onClose } = props;
    const rootRef = useRef(null);
    useEffect(() => {
        const onPointer = (event) => {
            const root = rootRef.current;
            if (root !== null && root.contains(event.target))
                return;
            onClose();
        };
        const onKey = (event) => {
            if (event.key === 'Escape')
                onClose();
        };
        // Defer so the opening contextmenu event does not immediately close us.
        const timer = window.setTimeout(() => {
            document.addEventListener('mousedown', onPointer, true);
            document.addEventListener('keydown', onKey, true);
        }, 0);
        return () => {
            window.clearTimeout(timer);
            document.removeEventListener('mousedown', onPointer, true);
            document.removeEventListener('keydown', onKey, true);
        };
    }, [onClose]);
    const maxX = typeof window !== 'undefined' ? window.innerWidth - 8 : x;
    const maxY = typeof window !== 'undefined' ? window.innerHeight - 8 : y;
    const left = Math.min(x, maxX - 160);
    const top = Math.min(y, maxY - 88);
    return (_jsx("div", { ref: rootRef, className: css.contextMenu, style: { left, top }, role: "menu", "data-file-explorer-context-menu": "", children: items.map((item) => (_jsx("button", { type: "button", role: "menuitem", disabled: item.disabled === true, className: item.danger === true ? `${css.contextItem} ${css.contextItemDanger}` : css.contextItem, onClick: () => {
                if (item.disabled === true)
                    return;
                onClose();
                item.onSelect();
            }, children: item.label }, item.id))) }));
}
//# sourceMappingURL=ExplorerContextMenu.js.map