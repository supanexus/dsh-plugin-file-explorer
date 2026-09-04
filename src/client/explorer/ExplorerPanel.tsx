/**
 * Sidebar explorer panel: workspace header + icon actions + root listing.
 */

import {
  Component,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type { ExplorerApi } from '../rpc.ts'
import type { FsEntry } from '../../shared/rpc-contract.ts'
import type { TabsStore } from '../state/tabs.ts'
import { useExplorerT } from '../use-explorer-t.ts'
import { InlineNameInput } from './InlineNameInput.tsx'
import {
  CollapseAllIconButton,
  ExpandAllIconButton,
  NewFileIconButton,
  NewFolderIconButton,
  RefreshIconButton,
  RevealIconButton,
} from './ToolbarIcons.tsx'
import { TreeNode } from './TreeNode.tsx'
import css from './explorer.module.css'

export interface ExplorerPanelProps {
  readonly ctx: ClientContext
  readonly api: ExplorerApi
  readonly tabs: TabsStore
  readonly onOpenFile: (path: string) => void
  readonly onRenamed?: (from: string, to: string) => void
}

class PanelBoundary extends Component<
  { readonly children: ReactNode },
  { readonly message: string | null }
> {
  override state: { readonly message: string | null } = { message: null }

  static getDerivedStateFromError(error: Error): { readonly message: string } {
    return { message: error.message }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[file-explorer] panel crash', error, info)
  }

  override render(): ReactNode {
    if (this.state.message !== null) {
      return <div className={css.errorBanner}>{this.state.message}</div>
    }
    return this.props.children
  }
}

/** Basename for display; browser bundle may not have node:path — keep a fallback. */
function workspaceLabel(root: string): string {
  const normalized = root.replaceAll('\\', '/').replace(/\/+$/, '')
  const name = normalized.includes('/')
    ? normalized.slice(normalized.lastIndexOf('/') + 1)
    : normalized
  return name || root || 'workspace'
}

/**
 * Root listing with create-file / create-dir actions.
 */
export function ExplorerPanel(props: ExplorerPanelProps): ReactElement {
  return (
    <PanelBoundary>
      <ExplorerPanelInner {...props} />
    </PanelBoundary>
  )
}

function ExplorerPanelInner(props: ExplorerPanelProps): ReactElement {
  const { ctx, api, tabs, onOpenFile } = props
  const t = useExplorerT(ctx)
  const activePath = useSyncExternalStore(tabs.subscribe, () => tabs.getSnapshot().activePath)
  const [entries, setEntries] = useState<readonly FsEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState(0)
  const [expandSignal, setExpandSignal] = useState(0)
  const [collapseSignal, setCollapseSignal] = useState(0)
  const [rootDraft, setRootDraft] = useState<'file' | 'dir' | null>(null)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [rootPath, setRootPath] = useState('')

  useEffect(() => {
    if (activePath !== null) setSelectedPath(activePath)
  }, [activePath])

  const reload = useCallback(async (): Promise<void> => {
    const [listResult, rootResult] = await Promise.all([api.list(''), api.getRoot()])
    if (rootResult.ok) setRootPath(rootResult.value.root)
    if (!listResult.ok) {
      setError(listResult.error.message)
      return
    }
    setError(null)
    setEntries(listResult.value.entries)
  }, [api])

  useEffect(() => {
    void reload()
  }, [reload, refreshToken])

  const bump = (): void => {
    setRefreshToken((n) => n + 1)
  }

  const commitRootCreate = async (kind: 'file' | 'dir', name: string): Promise<void> => {
    setRootDraft(null)
    const path = name
    if (kind === 'file') {
      const result = await api.write(path, '')
      if (!result.ok) {
        setError(result.error.message)
        return
      }
      bump()
      setSelectedPath(path)
      onOpenFile(path)
      return
    }
    const result = await api.mkdir(path)
    if (!result.ok) {
      setError(result.error.message)
      return
    }
    bump()
    setSelectedPath(path)
  }

  const revealRoot = async (): Promise<void> => {
    const result = await api.revealRoot()
    if (!result.ok) setError(result.error.message)
  }

  const title = workspaceLabel(rootPath)

  return (
    <div className={css.panel} data-file-explorer-panel="">
      <div className={css.toolbar}>
        <div className={css.workspaceName} title={rootPath || undefined}>
          {title}
        </div>
        <div className={css.toolbarActions}>
          <NewFileIconButton title={t('newFile')} onClick={() => setRootDraft('file')} />
          <NewFolderIconButton title={t('newFolder')} onClick={() => setRootDraft('dir')} />
          <ExpandAllIconButton title={t('expandAll')} onClick={() => setExpandSignal((n) => n + 1)} />
          <CollapseAllIconButton title={t('collapseAll')} onClick={() => setCollapseSignal((n) => n + 1)} />
          <RefreshIconButton title={t('refresh')} onClick={() => bump()} />
          <RevealIconButton title={t('openInFileManager')} onClick={() => void revealRoot()} />
        </div>
      </div>
      {error !== null ? <div className={css.errorBanner}>{error}</div> : null}
      {entries.length === 0 && rootDraft === null ? (
        <div className={css.empty}>{t('emptyWorkspace')}</div>
      ) : (
        <div className={css.treeScroll} data-file-explorer-tree-scroll="">
          <ul className={css.tree} role="tree">
            {rootDraft !== null ? (
              <li key={`draft-${rootDraft}`}>
                <InlineNameInput
                  depth={0}
                  kind={rootDraft}
                  initialValue=""
                  placeholder={rootDraft === 'file' ? t('promptNewFile') : t('promptNewFolder')}
                  ariaLabel={rootDraft === 'file' ? t('newFile') : t('newFolder')}
                  onCancel={() => setRootDraft(null)}
                  onCommit={(name) => {
                    void commitRootCreate(rootDraft, name)
                  }}
                />
              </li>
            ) : null}
            {entries.map((entry) => (
              <TreeNode
                key={entry.path}
                entry={entry}
                depth={0}
                api={api}
                t={t}
                activePath={activePath}
                selectedPath={selectedPath}
                onSelect={setSelectedPath}
                onOpenFile={onOpenFile}
                onError={setError}
              onTreeMutated={bump}
              refreshToken={refreshToken}
              expandSignal={expandSignal}
              collapseSignal={collapseSignal}
            />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
