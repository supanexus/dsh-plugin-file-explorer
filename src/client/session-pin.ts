/**
 * Pin explorer root to the current session cwd when available.
 */

import type { Context } from '@deepseek-ai/cordis'
import type { ExplorerApi } from './rpc.ts'
import type { ExplorerModeStore } from './state/mode.ts'

type SessionsLike = {
  list: {
    getSnapshot: () => {
      current?: string
      byId: Record<string, { cwd?: string } | undefined>
    }
    subscribe: (listener: () => void) => () => void
  }
}

/**
 * Keep host root aligned with session cwd while explorer mode is on.
 * Re-syncs when the session changes or when mode turns on.
 * @returns disposer.
 */
export function installSessionRootPin(
  ctx: Context,
  api: ExplorerApi,
  mode: ExplorerModeStore,
): () => void {
  const sessions = (ctx as Context & { sessions?: SessionsLike }).sessions
  if (sessions === undefined) return () => {}

  const sync = (): void => {
    if (!mode.getSnapshot()) return
    const snap = sessions.list.getSnapshot()
    const current = snap.current
    if (current === undefined) return
    const cwd = snap.byId[current]?.cwd
    if (cwd === undefined || cwd.trim() === '') return
    void api.setRoot(cwd)
  }

  sync()
  const unsubSessions = sessions.list.subscribe(sync)
  const unsubMode = mode.subscribe(() => {
    sync()
  })
  return () => {
    unsubSessions()
    unsubMode()
  }
}
