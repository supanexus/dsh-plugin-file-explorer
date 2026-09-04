/** Subscribe to active locale and return an explorer translate function. */

import { useSyncExternalStore } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import { explorerT, type ExplorerTranslate } from './locales.ts'

/** Reactive `t` for file-explorer copy. */
export function useExplorerT(ctx: ClientContext): ExplorerTranslate {
  const locale = useSyncExternalStore(
    (listener) => ctx.locale.subscribe(listener),
    () => ctx.locale.getSnapshot().active,
  )
  return explorerT(locale)
}
