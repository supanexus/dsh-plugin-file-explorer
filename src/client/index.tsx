/**
 * Client half: Files tab fills the conversation viewArea (composer-overlay
 * contract) with a center tree | editor split. Left sidebar stays the
 * official workspace / conversation list (no sidebar.workspaces shadow).
 */

import {
  Component,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactElement,
  type ReactNode,
} from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type {} from '@deepseek-ai/dsh-client-locale/client'
import type { SettingsScope } from '@deepseek-ai/dsh-client-ui-settings/client'
import {
  FILE_EXPLORER_SETTINGS_NS,
  type FileExplorerSettings,
} from '../shared/settings-contract.ts'
import { createExplorerApi, TYPERT_REMOTE, type ExplorerApi } from './rpc.ts'
import { TabsStore } from './state/tabs.ts'
import { BuffersStore } from './state/buffers.ts'
import { MdModeStore } from './state/md-mode.ts'
import { ExplorerModeStore } from './state/mode.ts'
import { ExplorerPanel } from './explorer/ExplorerPanel.tsx'
import { EditorSurface, requestOpenPath } from './editor/EditorSurface.tsx'
import { ExplorerSettingsCard } from './settings/ExplorerSettingsCard.tsx'
import type {} from './settings/slot-contract.ts'
import { dictionaries, explorerT, NS } from './locales.ts'
import { useExplorerT } from './use-explorer-t.ts'
import { installOpenLinksInterceptor } from './open-links.ts'
import { installSessionRootPin } from './session-pin.ts'
import css from './files-view.module.css'

const PACKAGE = '@supanexus/dsh-plugin-file-explorer'
export const VIEW_ID = 'file-explorer'

/** Required client services before apply runs. */
export const inject = [
  'slots',
  'remote',
  'locale',
  'connection',
  'settingsScope',
]

/**
 * Mount remotes and register UI slots.
 * @param ctx - Client root context.
 */
export async function apply(ctx: ClientContext): Promise<void> {
  const disposeRemote = await ctx.remote.$mount(TYPERT_REMOTE)
  ctx.effect(() => disposeRemote, 'supanexus-file-explorer: remote')

  ctx.effect(() => ctx.locale.register(NS, dictionaries), 'supanexus-file-explorer: dictionaries')

  const settings = ctx.settingsScope.bind<FileExplorerSettings>({
    namespace: FILE_EXPLORER_SETTINGS_NS,
  })

  const tabs = new TabsStore()
  const buffers = new BuffersStore()
  const mdModes = new MdModeStore()
  const mode = new ExplorerModeStore()

  ctx.inject(['remote.explorerFs'], (remoteCtx) => {
    const api = createExplorerApi(remoteCtx)

    remoteCtx.effect(
      () => installOpenLinksInterceptor(settings),
      'supanexus-file-explorer: open-links',
    )

    remoteCtx.inject(['sessions'], (sessionCtx) => {
      sessionCtx.effect(
        () => installSessionRootPin(sessionCtx, api, mode),
        'supanexus-file-explorer: session-pin',
      )
    })

    // Files view owns the full column — hide the resident InputBar via the
    // conversation.composer chain (overlay keeps the draft mounted off-screen).
    // Priority 50: after approval/questions/subagent takeovers so those still win.
    remoteCtx.effect(() => {
      let disposeComposer: (() => void) | undefined

      const syncComposer = (): void => {
        const enabled = mode.getSnapshot()
        if (disposeComposer !== undefined) {
          try {
            disposeComposer()
          } catch (error) {
            console.error('[file-explorer] composer dispose failed', error)
          }
          disposeComposer = undefined
        }
        if (!enabled) return
        try {
          disposeComposer = remoteCtx.effect(() => remoteCtx.slots.register({
            name: 'conversation.composer',
            priority: 50,
            registrant: PACKAGE,
            select: () => ({ hide: true as const }),
          }, () => null), 'supanexus-file-explorer: composer-hide')
        } catch (error) {
          console.error('[file-explorer] conversation.composer register failed', error)
        }
      }

      syncComposer()
      const unsub = mode.subscribe(syncComposer)
      return () => {
        unsub()
        if (disposeComposer !== undefined) {
          try {
            disposeComposer()
          } catch {
            // ignore
          }
          disposeComposer = undefined
        }
      }
    }, 'supanexus-file-explorer: mode→composer')

    remoteCtx.slots.inject('conversation.view', () => remoteCtx.slots.register({
      name: 'conversation.view',
      id: VIEW_ID,
      order: 40,
      locale: NS,
      label: () => explorerT(remoteCtx.locale.getSnapshot().active)('viewLabel'),
      registrant: PACKAGE,
    }, () => (
      <FilesView
        ctx={remoteCtx}
        mode={mode}
        api={api}
        tabs={tabs}
        buffers={buffers}
        mdModes={mdModes}
      />
    )))

    remoteCtx.slots.inject('settings.plugin.item', () => remoteCtx.slots.register({
      name: 'settings.plugin.item',
      key: FILE_EXPLORER_SETTINGS_NS,
      registrant: PACKAGE,
    }, (props) => (
      <ExplorerSettingsCard
        ctx={remoteCtx}
        scope={settings as SettingsScope<FileExplorerSettings>}
        {...props}
      />
    )))
  })
}

class FilesViewBoundary extends Component<
  { readonly children: ReactNode },
  { readonly message: string | null }
> {
  override state: { readonly message: string | null } = { message: null }

  static getDerivedStateFromError(error: Error): { readonly message: string } {
    return { message: error.message }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[file-explorer] FilesView crash', error, info)
  }

  override render(): ReactNode {
    if (this.state.message !== null) {
      return (
        <div
          className={css.shell}
          data-file-explorer-view=""
          data-conversation-composer-overlay=""
        >
          <div className={css.crash}>{this.state.message}</div>
        </div>
      )
    }
    return this.props.children
  }
}

const TREE_WIDTH_KEY = 'supanexus-file-explorer:tree-width'
const TREE_WIDTH_DEFAULT = 280
const TREE_WIDTH_MIN = 160
const TREE_WIDTH_MAX = 720

function readTreeWidth(): number {
  try {
    const raw = window.localStorage.getItem(TREE_WIDTH_KEY)
    if (raw === null) return TREE_WIDTH_DEFAULT
    const n = Number(raw)
    if (!Number.isFinite(n)) return TREE_WIDTH_DEFAULT
    return Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, Math.round(n)))
  } catch {
    return TREE_WIDTH_DEFAULT
  }
}

/**
 * Files conversation view. The root MUST carry
 * `data-conversation-composer-overlay` so ConversationRoot stretches
 * `.viewArea`; without it the pane collapses to zero height.
 */
function FilesView(props: {
  readonly ctx: ClientContext
  readonly mode: ExplorerModeStore
  readonly api: ExplorerApi
  readonly tabs: TabsStore
  readonly buffers: BuffersStore
  readonly mdModes: MdModeStore
}): ReactElement {
  const { ctx, mode, api, tabs, buffers, mdModes } = props
  const t = useExplorerT(ctx)
  const [treeWidth, setTreeWidth] = useState(TREE_WIDTH_DEFAULT)
  const dragRef = useRef<{ readonly startX: number; readonly startWidth: number } | null>(null)

  useLayoutEffect(() => {
    setTreeWidth(readTreeWidth())
  }, [])

  useLayoutEffect(() => {
    mode.setEnabled(true)
    return () => {
      mode.setEnabled(false)
    }
  }, [mode])

  const onResizePointerDown = useCallback((event: {
    preventDefault: () => void
    currentTarget: HTMLDivElement
    pointerId: number
    clientX: number
  }): void => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { startX: event.clientX, startWidth: treeWidth }
  }, [treeWidth])

  const onResizePointerMove = useCallback((event: { clientX: number }): void => {
    const drag = dragRef.current
    if (drag === null) return
    const next = Math.min(
      TREE_WIDTH_MAX,
      Math.max(TREE_WIDTH_MIN, drag.startWidth + (event.clientX - drag.startX)),
    )
    setTreeWidth(next)
  }, [])

  const onResizePointerUp = useCallback((event: {
    currentTarget: HTMLDivElement
    pointerId: number
  }): void => {
    if (dragRef.current === null) return
    dragRef.current = null
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // ignore
    }
    setTreeWidth((width) => {
      try {
        window.localStorage.setItem(TREE_WIDTH_KEY, String(width))
      } catch {
        // ignore
      }
      return width
    })
  }, [])

  return (
    <FilesViewBoundary>
      <div
        className={css.shell}
        data-file-explorer-view=""
        data-conversation-composer-overlay=""
      >
        <div className={css.filesView}>
          <aside
            className={css.treeCol}
            style={{ width: treeWidth }}
            aria-label={t('treeAriaLabel')}
          >
            <ExplorerPanel
              ctx={ctx}
              api={api}
              tabs={tabs}
              onOpenFile={(path) => {
                requestOpenPath(path)
              }}
            />
            <div
              className={css.treeResize}
              role="separator"
              aria-orientation="vertical"
              aria-valuenow={treeWidth}
              aria-valuemin={TREE_WIDTH_MIN}
              aria-valuemax={TREE_WIDTH_MAX}
              onPointerDown={onResizePointerDown}
              onPointerMove={onResizePointerMove}
              onPointerUp={onResizePointerUp}
              onPointerCancel={onResizePointerUp}
            />
          </aside>
          <div className={css.editorCol}>
            <EditorSurface ctx={ctx} api={api} tabs={tabs} buffers={buffers} mdModes={mdModes} />
          </div>
        </div>
      </div>
    </FilesViewBoundary>
  )
}
