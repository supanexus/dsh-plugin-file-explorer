import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Shared basename sanitizer and inline name editor for the file tree.
 */
import { useEffect, useRef } from 'react';
import css from './explorer.module.css';
/** Reject empty / path-segment / traversal names; strip parent path if pasted. */
export function sanitizeBasename(raw) {
    const trimmed = raw.trim();
    if (trimmed === '')
        return null;
    const base = trimmed.replaceAll('\\', '/').split('/').filter(Boolean).pop() ?? '';
    if (base === '' || base === '.' || base === '..')
        return null;
    if (base.includes('/') || base.includes('\\'))
        return null;
    return base;
}
function FolderIcon() {
    return (_jsx("svg", { className: css.icon, viewBox: "0 0 16 16", "aria-hidden": "true", children: _jsx("path", { fill: "currentColor", d: "M1.5 3.5h5l1 1.5h7v8h-13z", opacity: "0.85" }) }));
}
function FileIcon() {
    return (_jsx("svg", { className: css.icon, viewBox: "0 0 16 16", "aria-hidden": "true", children: _jsx("path", { fill: "currentColor", d: "M4 1.5h5.5L13 5v9.5H4z", opacity: "0.75" }) }));
}
/**
 * Tree row with a focused text field. Enter commits; Escape cancels;
 * blur commits when non-empty, otherwise cancels.
 */
export function InlineNameInput(props) {
    const { depth, kind, initialValue, placeholder, ariaLabel, onCommit, onCancel } = props;
    const ref = useRef(null);
    const finished = useRef(false);
    useEffect(() => {
        const el = ref.current;
        if (el === null)
            return;
        el.focus();
        el.select();
    }, []);
    const finish = (fn) => {
        if (finished.current)
            return;
        finished.current = true;
        fn();
    };
    const tryCommit = (raw) => {
        const name = sanitizeBasename(raw);
        if (name === null) {
            finish(onCancel);
            return;
        }
        finish(() => onCommit(name));
    };
    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            tryCommit(event.currentTarget.value);
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            finish(onCancel);
        }
    };
    return (_jsxs("div", { className: `${css.row} ${css.rowEditing}`, style: { paddingLeft: 8 + depth * 12 }, "data-file-explorer-inline-edit": "", children: [_jsx("span", { className: css.chevronPlaceholder }), kind === 'dir' ? _jsx(FolderIcon, {}) : _jsx(FileIcon, {}), _jsx("input", { ref: ref, className: css.inlineInput, defaultValue: initialValue, placeholder: placeholder, "aria-label": ariaLabel, spellCheck: false, onClick: (event) => event.stopPropagation(), onKeyDown: onKeyDown, onBlur: (event) => {
                    tryCommit(event.currentTarget.value);
                } })] }));
}
//# sourceMappingURL=InlineNameInput.js.map