import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Plugins page contribution for file explorer preferences.
 */
import { useCallback, useState, useSyncExternalStore } from 'react';
import { explorerT } from "../locales.js";
import css from './settings-card.module.css';
/** Summary one-liner or settings form body for the Plugins page. */
export function ExplorerSettingsCard(props) {
    const { ctx, scope, view, t: slotT } = props;
    const snap = useSyncExternalStore(scope.subscribe, () => scope.getSnapshot());
    const locale = useSyncExternalStore((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active);
    const t = explorerT(locale);
    const [draftRoot, setDraftRoot] = useState(null);
    const [saving, setSaving] = useState(false);
    if (view === 'summary')
        return slotT('settingsDescription');
    const available = snap.status === 'ready';
    const writable = snap.writable;
    const value = snap.value;
    if (!available || value === undefined)
        return null;
    const rootValue = draftRoot ?? value.root;
    const openLinks = value.openLinksInEditor;
    const commitRoot = useCallback(async () => {
        if (!writable || saving || draftRoot === null)
            return;
        setSaving(true);
        try {
            await scope.set('root', draftRoot);
            setDraftRoot(null);
        }
        finally {
            setSaving(false);
        }
    }, [draftRoot, saving, scope, writable]);
    const toggleLinks = useCallback(async (checked) => {
        if (!writable || saving)
            return;
        setSaving(true);
        try {
            await scope.set('openLinksInEditor', checked);
        }
        finally {
            setSaving(false);
        }
    }, [saving, scope, writable]);
    return (_jsxs("div", { className: css.body, children: [!writable ? _jsx("p", { className: css.readOnly, role: "status", children: t('readOnly') }) : null, _jsxs("div", { className: css.field, children: [_jsx("label", { className: css.label, htmlFor: "fe-root", children: t('settingsRoot') }), _jsx("input", { id: "fe-root", className: css.textInput, value: rootValue, disabled: !writable || saving, onChange: (event) => setDraftRoot(event.target.value), onBlur: () => { void commitRoot(); }, onKeyDown: (event) => {
                            if (event.key === 'Enter')
                                void commitRoot();
                        } }), _jsx("p", { className: css.hint, children: t('settingsRootHint') })] }), _jsxs("div", { className: css.field, children: [_jsxs("label", { className: writable ? css.row : `${css.row} ${css.rowDisabled}`, children: [_jsx("input", { className: css.checkbox, type: "checkbox", checked: openLinks, disabled: !writable || saving, onChange: (event) => { void toggleLinks(event.target.checked); } }), _jsx("span", { children: t('settingsOpenLinks') })] }), _jsx("p", { className: css.hint, children: t('settingsOpenLinksHint') })] })] }));
}
//# sourceMappingURL=ExplorerSettingsCard.js.map