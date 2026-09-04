/**
 * Single tree node with lazy children; rename/create via inline edit + context menu.
 */

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import type { ExplorerApi } from '../rpc.ts'
import type { FsEntry } from '../../shared/rpc-contract.ts'
import type { ExplorerTranslate } from '../locales.ts'
import { ExplorerContextMenu } from './ExplorerContextMenu.tsx'
import { InlineNameInput } from './InlineNameInput.tsx'
import { scrollTreeRowIntoView } from './scroll-tree-row.ts'
import css from './explorer.module.css'

export interface TreeNodeProps {
  readonly entry: FsEntry
  readonly depth: number
  readonly api: ExplorerApi
  readonly t: ExplorerTranslate
  readonly activePath: string | null
  readonly selectedPath: string | null
  readonly onSelect: (path: string) => void
  readonly onOpenFile: (path: string) => void
  readonly onError: (message: string) => void
  readonly onTreeMutated: () => void
  readonly refreshToken: number
  /** Bumped by toolbar «expand all»; non-zero values force directories open. */
  readonly expandSignal: number
  /** Bumped by toolbar «collapse all»; non-zero values force directories closed. */
  readonly collapseSignal: number
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

function Chevron({ open }: { readonly open: boolean }): ReactElement {
  return (
    <svg
      className={css.chevron}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 0.12s' }}
    >
      <path fill="currentColor" d="M6 3l5 5-5 5z" />
    </svg>
  )
}

function joinPath(parent: string, name: string): string {
  return parent === '' ? name : `${parent}/${name}`
}

function parentPath(path: string): string {
  return path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
}

/**
 * Render one filesystem entry; directories expand lazily via `api.list`.
 */
export function TreeNode(props: TreeNodeProps): ReactElement {
  const {
    entry, depth, api, t, activePath, selectedPath, onSelect, onOpenFile, onError, onTreeMutated,
    refreshToken, expandSignal, collapseSignal,
  } = props
  const [expanded, setExpanded] = useState(false)
  const [children, setChildren] = useState<readonly FsEntry[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState<{ readonly x: number; readonly y: number } | null>(null)
  const [renaming, setRenaming] = useState(false)
  const [childDraft, setChildDraft] = useState<'file' | 'dir' | null>(null)

  const loadChildren = useCallback(async (): Promise<void> => {
    setLoading(true)
    const result = await api.list(entry.path)
    setLoading(false)
    if (!result.ok) {
      onError(result.error.message)
      return
    }
    setChildren(result.value.entries)
  }, [api, entry.path, onError])

  useEffect(() => {
    if (!expanded) return
    void loadChildren()
  }, [expanded, refreshToken, loadChildren])

  useEffect(() => {
    if (expandSignal === 0 || entry.kind !== 'dir') return
    setExpanded(true)
  }, [expandSignal, entry.kind])

  useEffect(() => {
    if (collapseSignal === 0 || entry.kind !== 'dir') return
    setExpanded(false)
  }, [collapseSignal, entry.kind])

  const toggleExpand = (): void => {
    if (entry.kind !== 'dir') return
    setExpanded((v) => !v)
  }

  const onRowClick = (): void => {
    if (renaming) return
    onSelect(entry.path)
    if (entry.kind === 'dir') {
      toggleExpand()
      return
    }
    onOpenFile(entry.path)
  }

  const commitRename = async (name: string): Promise<void> => {
    setRenaming(false)
    if (name === entry.name) return
    const to = joinPath(parentPath(entry.path), name)
    const result = await api.rename(entry.path, to)
    if (!result.ok) {
      onError(result.error.message)
      return
    }
    onSelect(to)
    onTreeMutated()
  }

  const commitChildCreate = async (kind: 'file' | 'dir', name: string): Promise<void> => {
    setChildDraft(null)
    const path = joinPath(entry.path, name)
    if (kind === 'file') {
      const result = await api.write(path, '')
      if (!result.ok) {
        onError(result.error.message)
        return
      }
      onTreeMutated()
      onSelect(path)
      onOpenFile(path)
      return
    }
    const result = await api.mkdir(path)
    if (!result.ok) {
      onError(result.error.message)
      return
    }
    onSelect(path)
    onTreeMutated()
  }

  const startChildDraft = (kind: 'file' | 'dir'): void => {
    setExpanded(true)
    setChildDraft(kind)
  }

  const remove = async (): Promise<void> => {
    if (!window.confirm(t('confirmDelete', { name: entry.name }))) return
    const result = await api.unlink(entry.path)
    if (!result.ok) {
      onError(result.error.message)
      return
    }
    onTreeMutated()
  }

  const revealInFileManager = async (): Promise<void> => {
    const result = await api.revealPath(entry.path)
    if (!result.ok) onError(result.error.message)
  }

  const selected = entry.path === selectedPath
  const opened = entry.path === activePath
  const rowRef = useRef<HTMLDivElement | null>(null)
  const rowClass = [
    css.row,
    selected ? css.rowSelected : '',
    opened && !selected ? css.rowOpened : '',
  ].filter(Boolean).join(' ')

  useEffect(() => {
    if (!selected) return
    const row = rowRef.current
    if (row === null) return
    const id = window.requestAnimationFrame(() => {
      scrollTreeRowIntoView(row)
    })
    return () => window.cancelAnimationFrame(id)
  }, [selected, expanded])

  const menuItems = entry.kind === 'dir'
    ? [
        {
          id: 'expand-toggle',
          label: expanded ? t('collapse') : t('expand'),
          onSelect: () => {
            toggleExpand()
          },
        },
        {
          id: 'reveal',
          label: t('revealPathInFileManager'),
          onSelect: () => {
            void revealInFileManager()
          },
        },
        {
          id: 'new-file',
          label: t('newFile'),
          onSelect: () => {
            startChildDraft('file')
          },
        },
        {
          id: 'new-folder',
          label: t('newFolder'),
          onSelect: () => {
            startChildDraft('dir')
          },
        },
        {
          id: 'rename',
          label: t('rename'),
          onSelect: () => {
            setRenaming(true)
          },
        },
        {
          id: 'delete',
          label: t('delete'),
          danger: true as const,
          onSelect: () => {
            void remove()
          },
        },
      ]
    : [
        {
          id: 'reveal',
          label: t('revealPathInFileManager'),
          onSelect: () => {
            void revealInFileManager()
          },
        },
        {
          id: 'rename',
          label: t('rename'),
          onSelect: () => {
            setRenaming(true)
          },
        },
        {
          id: 'delete',
          label: t('delete'),
          danger: true as const,
          onSelect: () => {
            void remove()
          },
        },
      ]

  return (
    <li>
      {renaming ? (
        <InlineNameInput
          depth={depth}
          kind={entry.kind}
          initialValue={entry.name}
          placeholder={t('promptRename')}
          ariaLabel={t('rename')}
          onCancel={() => setRenaming(false)}
          onCommit={(name) => {
            void commitRename(name)
          }}
        />
      ) : (
        <div
          ref={rowRef}
          className={rowClass}
          style={{ paddingLeft: 8 + depth * 12 }}
          title={entry.path || entry.name}
          role="treeitem"
          aria-selected={selected}
          aria-expanded={entry.kind === 'dir' ? expanded : undefined}
          onClick={onRowClick}
          onContextMenu={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onSelect(entry.path)
            setMenu({ x: event.clientX, y: event.clientY })
          }}
          onKeyDown={(event) => {
            if (entry.kind === 'dir' && event.key === 'ArrowRight') {
              event.preventDefault()
              onSelect(entry.path)
              setExpanded(true)
              return
            }
            if (entry.kind === 'dir' && event.key === 'ArrowLeft') {
              event.preventDefault()
              onSelect(entry.path)
              setExpanded(false)
              return
            }
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onRowClick()
            }
            if (event.key === 'F2') {
              event.preventDefault()
              onSelect(entry.path)
              setRenaming(true)
            }
          }}
          tabIndex={0}
        >
          {entry.kind === 'dir' ? (
            <button
              type="button"
              className={css.chevronBtn}
              aria-label={expanded ? t('collapse') : t('expand')}
              tabIndex={-1}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onSelect(entry.path)
                toggleExpand()
              }}
            >
              <Chevron open={expanded} />
            </button>
          ) : (
            <span className={css.chevronPlaceholder} />
          )}
          {entry.kind === 'dir' ? <FolderIcon /> : <FileIcon />}
          <span className={css.label}>{entry.name}{loading ? '…' : ''}</span>
        </div>
      )}
      {menu !== null ? (
        <ExplorerContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={menuItems}
        />
      ) : null}
      {entry.kind === 'dir' && expanded ? (
        <ul className={css.children} role="group">
          {childDraft !== null ? (
            <li key={`draft-${childDraft}`}>
              <InlineNameInput
                depth={depth + 1}
                kind={childDraft}
                initialValue=""
                placeholder={childDraft === 'file' ? t('promptNewFile') : t('promptNewFolder')}
                ariaLabel={childDraft === 'file' ? t('newFile') : t('newFolder')}
                onCancel={() => setChildDraft(null)}
                onCommit={(name) => {
                  void commitChildCreate(childDraft, name)
                }}
              />
            </li>
          ) : null}
          {children !== null
            ? children.map((child) => (
              <TreeNode
                key={child.path}
                entry={child}
                depth={depth + 1}
                api={api}
                t={t}
                activePath={activePath}
                selectedPath={selectedPath}
                onSelect={onSelect}
                onOpenFile={onOpenFile}
                onError={onError}
                onTreeMutated={onTreeMutated}
                refreshToken={refreshToken}
                expandSignal={expandSignal}
                collapseSignal={collapseSignal}
              />
            ))
            : null}
          {children !== null && children.length === 0 && childDraft === null ? (
            <li className={css.emptyChild} style={{ paddingLeft: 8 + (depth + 1) * 12 }}>
              {t('emptyWorkspace')}
            </li>
          ) : null}
        </ul>
      ) : null}
    </li>
  )
}
