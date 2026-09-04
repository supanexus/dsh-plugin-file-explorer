import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Popover for Monaco theme + custom hex background + font size + saved schemes.
 */
import { useEffect, useRef, useState } from 'react';
import { EDITOR_FONT_MAX, EDITOR_FONT_MIN, hexForColorInput, normalizeHexColor, } from "./appearance.js";
import css from './editor.module.css';
const THEME_OPTIONS = [
    { id: 'vs-dark', labelKey: 'editorThemeDark' },
    { id: 'vs', labelKey: 'editorThemeLight' },
    { id: 'hc-black', labelKey: 'editorThemeHighContrast' },
];
/**
 * Floating panel: preset themes, custom HTML hex, font size, saved schemes.
 */
export function AppearanceMenu(props) {
    const { t, appearance, store, onClose } = props;
    const rootRef = useRef(null);
    const [hexDraft, setHexDraft] = useState(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
    const [hexInvalid, setHexInvalid] = useState(false);
    useEffect(() => {
        setHexDraft(appearance.customBackground ?? hexForColorInput(null, appearance.theme));
        setHexInvalid(false);
    }, [appearance.customBackground, appearance.theme]);
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
    const commitHex = (raw) => {
        const normalized = normalizeHexColor(raw);
        if (normalized === null) {
            setHexInvalid(true);
            return false;
        }
        setHexInvalid(false);
        setHexDraft(normalized);
        store.setCustomBackground(normalized);
        return true;
    };
    const saveCurrentScheme = () => {
        const draft = hexDraft.trim();
        if (draft !== '') {
            const normalized = normalizeHexColor(draft);
            if (normalized === null) {
                setHexInvalid(true);
                return;
            }
            setHexInvalid(false);
            setHexDraft(normalized);
            store.setCustomBackground(normalized);
            store.saveScheme(normalized);
            return;
        }
        store.saveScheme();
    };
    const pickerValue = hexForColorInput(normalizeHexColor(hexDraft) ?? appearance.customBackground, appearance.theme);
    return (_jsxs("div", { ref: rootRef, className: css.appearanceMenu, role: "dialog", "aria-label": t('editorAppearance'), "data-file-explorer-appearance": "", children: [_jsxs("div", { className: css.appearanceSection, children: [_jsx("div", { className: css.appearanceLabel, children: t('editorTheme') }), _jsx("div", { className: css.appearanceThemeRow, role: "radiogroup", "aria-label": t('editorTheme'), children: THEME_OPTIONS.map((option) => (_jsx("button", { type: "button", role: "radio", "aria-checked": appearance.customBackground === null && appearance.theme === option.id, className: appearance.customBackground === null && appearance.theme === option.id
                                ? `${css.appearanceChip} ${css.appearanceChipActive}`
                                : css.appearanceChip, onClick: () => store.setTheme(option.id), children: t(option.labelKey) }, option.id))) })] }), _jsxs("div", { className: css.appearanceSection, children: [_jsx("div", { className: css.appearanceLabel, children: t('editorCustomColor') }), _jsxs("div", { className: css.appearanceColorRow, children: [_jsx("input", { type: "color", className: css.appearanceColorSwatch, value: pickerValue, "aria-label": t('editorCustomColor'), onChange: (event) => {
                                    commitHex(event.target.value);
                                } }), _jsx("input", { type: "text", className: hexInvalid ? `${css.appearanceHexInput} ${css.appearanceHexInvalid}` : css.appearanceHexInput, value: hexDraft, spellCheck: false, placeholder: "#1e1e1e", "aria-invalid": hexInvalid, "aria-label": t('editorCustomColor'), onChange: (event) => {
                                    setHexDraft(event.target.value);
                                    setHexInvalid(false);
                                }, onBlur: () => {
                                    if (hexDraft.trim() === '') {
                                        store.setCustomBackground(null);
                                        setHexDraft(hexForColorInput(null, appearance.theme));
                                        setHexInvalid(false);
                                        return;
                                    }
                                    commitHex(hexDraft);
                                }, onKeyDown: (event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        commitHex(hexDraft);
                                    }
                                } }), _jsx("button", { type: "button", className: css.appearanceStep, disabled: appearance.customBackground === null, onClick: () => {
                                    store.setCustomBackground(null);
                                    setHexDraft(hexForColorInput(null, appearance.theme));
                                    setHexInvalid(false);
                                }, children: t('editorCustomColorClear') })] }), hexInvalid ? (_jsx("div", { className: css.appearanceHint, children: t('editorCustomColorInvalid') })) : (_jsx("div", { className: css.appearanceHint, children: t('editorCustomColorHint') }))] }), _jsxs("div", { className: css.appearanceSection, children: [_jsx("div", { className: css.appearanceLabel, children: t('editorFontSize') }), _jsxs("div", { className: css.appearanceFontRow, children: [_jsx("button", { type: "button", className: css.appearanceStep, "aria-label": t('editorFontSmaller'), disabled: appearance.fontSize <= EDITOR_FONT_MIN, onClick: () => store.bumpFont(-1), children: "A\u2212" }), _jsxs("span", { className: css.appearanceFontValue, children: [appearance.fontSize, "px"] }), _jsx("button", { type: "button", className: css.appearanceStep, "aria-label": t('editorFontLarger'), disabled: appearance.fontSize >= EDITOR_FONT_MAX, onClick: () => store.bumpFont(1), children: "A+" })] })] }), _jsxs("div", { className: css.appearanceSection, children: [_jsx("div", { className: css.appearanceLabel, children: t('editorScheme') }), _jsx("button", { type: "button", className: css.appearanceSaveScheme, onClick: saveCurrentScheme, children: t('editorSchemeSave') }), appearance.schemes.length === 0 ? (_jsx("div", { className: css.appearanceHint, children: t('editorSchemeEmpty') })) : (_jsx("ul", { className: css.appearanceSchemeList, "aria-label": t('editorScheme'), children: appearance.schemes.map((scheme) => {
                            const active = appearance.customBackground === scheme.background
                                && appearance.fontSize === scheme.fontSize;
                            return (_jsxs("li", { className: css.appearanceSchemeItem, children: [_jsxs("button", { type: "button", className: active
                                            ? `${css.appearanceSchemeApply} ${css.appearanceSchemeApplyActive}`
                                            : css.appearanceSchemeApply, onClick: () => store.applyScheme(scheme.id), children: [_jsx("span", { className: css.appearanceSchemeSwatch, style: { background: scheme.background }, "aria-hidden": "true" }), _jsxs("span", { className: css.appearanceSchemeMeta, children: [scheme.background, ' · ', scheme.fontSize, "px"] })] }), _jsx("button", { type: "button", className: css.appearanceSchemeRemove, "aria-label": t('editorSchemeRemove'), onClick: () => store.removeScheme(scheme.id), children: "\u00D7" })] }, scheme.id));
                        }) }))] })] }));
}
//# sourceMappingURL=AppearanceMenu.js.map