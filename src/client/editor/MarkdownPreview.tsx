/**
 * Markdown preview using `marked`.
 */

import { useMemo, type ReactElement } from 'react'
import { marked } from 'marked'
import css from './editor.module.css'

export interface MarkdownPreviewProps {
  readonly content: string
}

/**
 * Render markdown source as HTML inside a scrollable pane.
 */
export function MarkdownPreview(props: MarkdownPreviewProps): ReactElement {
  const html = useMemo(() => {
    try {
      return marked.parse(props.content, { async: false }) as string
    } catch (error) {
      return `<pre>${escapeHtml(error instanceof Error ? error.message : 'preview failed')}</pre>`
    }
  }, [props.content])

  return (
    <div
      className={css.preview}
      data-file-explorer-preview=""
      // Workspace content is treated as local/trusted per product spec.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
