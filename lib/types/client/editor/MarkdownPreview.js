import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Markdown preview using `marked`.
 */
import { useMemo } from 'react';
import { marked } from 'marked';
import css from './editor.module.css';
/**
 * Render markdown source as HTML inside a scrollable pane.
 */
export function MarkdownPreview(props) {
    const html = useMemo(() => {
        try {
            return marked.parse(props.content, { async: false });
        }
        catch (error) {
            return `<pre>${escapeHtml(error instanceof Error ? error.message : 'preview failed')}</pre>`;
        }
    }, [props.content]);
    return (_jsx("div", { className: css.preview, "data-file-explorer-preview": "", 
        // Workspace content is treated as local/trusted per product spec.
        dangerouslySetInnerHTML: { __html: html } }));
}
function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}
//# sourceMappingURL=MarkdownPreview.js.map