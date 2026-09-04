/**
 * Shared basename sanitizer and inline name editor for the file tree.
 */

import { useEffect, useRef, type KeyboardEvent, type ReactElement } from 'react'
import css from './explorer.module.css'

/** Reject empty / path-segment / traversal names; strip parent path if pasted. */
export function sanitizeBasename(raw: string): string | null {
  const trimmed = raw.trim()
  if (trimmed === '') return null
  const base = trimmed.replaceAll('\\', '/').split('/').filter(Boolean).pop() ?? ''
  if (base === '' || base === '.' || base === '..') return null
  if (base.includes('/') || base.includes('\\')) return null
  return base
}

export interface InlineNameInputProps {
  readonly depth: number
  readonly kind: 'file' | 'dir'
  readonly initialValue: string
  readonly placeholder: string
  readonly ariaLabel: string
  readonly onCommit: (name: string) => void
  readonly onCancel: () => void
}

function FolderIcon(): ReactElement {
  return (
    <svg className={css.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M1.5 3.5h5l1 1.5h7v8h-13z" opacity="0.85" />
    </svg>
  )
}

function FileIcon(): ReactElement {
  return (
    <svg className={css.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M4 1.5h5.5L13 5v9.5H4z" opacity="0.75" />
    </svg>
  )
}

/**
 * Tree row with a focused text field. Enter commits; Escape cancels;
 * blur commits when non-empty, otherwise cancels.
 */
export function InlineNameInput(props: InlineNameInputProps): ReactElement {
  const { depth, kind, initialValue, placeholder, ariaLabel, onCommit, onCancel } = props
  const ref = useRef<HTMLInputElement | null>(null)
  const finished = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (el === null) return
    el.focus()
    el.select()
  }, [])

  const finish = (fn: () => void): void => {
    if (finished.current) return
    finished.current = true
    fn()
  }

  const tryCommit = (raw: string): void => {
    const name = sanitizeBasename(raw)
    if (name === null) {
      finish(onCancel)
      return
    }
    finish(() => onCommit(name))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      tryCommit(event.currentTarget.value)
      return
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      finish(onCancel)
    }
  }

  return (
    <div
      className={`${css.row} ${css.rowEditing}`}
      style={{ paddingLeft: 8 + depth * 12 }}
      data-file-explorer-inline-edit=""
    >
      <span className={css.chevronPlaceholder} />
      {kind === 'dir' ? <FolderIcon /> : <FileIcon />}
      <input
        ref={ref}
        className={css.inlineInput}
        defaultValue={initialValue}
        placeholder={placeholder}
        aria-label={ariaLabel}
        spellCheck={false}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
        onBlur={(event) => {
          tryCommit(event.currentTarget.value)
        }}
      />
    </div>
  )
}
