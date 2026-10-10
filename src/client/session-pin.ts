/**
 * Pin explorer root to the current session cwd when available.
 */

import type { Context } from '@deepseek-ai/cordis'
import type { SessionId } from '@deepseek-ai/dsh-api-remotes/client'
import type {} from '@deepseek-ai/dsh-api-session-controller/client'
import type {} from '@deepseek-ai/dsh-client-ui-session/client'
import { notifyRootPinned } from './root-events.ts'
import type { ExplorerApi } from './rpc.ts'
import type { ExplorerModeStore } from './state/mode.ts'

/**
 * Keep host root aligned with session cwd while explorer mode is on.
 * Re-syncs when the session changes or when mode turns on.
 *
 * Navigation lives on `uiSession.adapter.current` (SessionList no longer
 * exposes `.current` after the Controller / ui-session split).
 * @returns disposer.
 */
export function installSessionRootPin(
  ctx: Context,
  api: ExplorerApi,
  mode: ExplorerModeStore,
): () => void {
  const sessions = ctx.get('sessions')
  const uiSession = ctx.get('uiSession')
  if (sessions === undefined || uiSession === undefined) return () => {}

  let pinnedCwd: string | undefined

  const sync = (): void => {
    if (!mode.getSnapshot()) return
    const current = uiSession.adapter.current.getSnapshot().key as SessionId | undefined
    if (current === undefined) return
    const cwd = sessions.list.getSnapshot().byId[current]?.cwd
    if (cwd === undefined || cwd.trim() === '') return
    if (cwd === pinnedCwd) return
    void api.setRoot(cwd).then((result) => {
      if (!result.ok) return
      pinnedCwd = cwd
      notifyRootPinned()
    })
  }

  sync()
  const unsubBinding = uiSession.adapter.current.subscribe(sync)
  const unsubSessions = sessions.list.subscribe(sync)
  const unsubMode = mode.subscribe(() => {
    sync()
  })
  return () => {
    unsubBinding()
    unsubSessions()
    unsubMode()
  }
}
