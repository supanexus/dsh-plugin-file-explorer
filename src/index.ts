/**
 * File explorer plugin — Host half.
 */

import type { Context } from '@deepseek-ai/cordis'
import { ExplorerFsService } from './host/fs-service.ts'
import { type Config } from './host/config.ts'

export { Config, name, inject } from './host/config.ts'

function defaultRoot(): string {
  // Host Cordis runs under Node; client-build-environment stubs `process` without cwd.
  const proc = (globalThis as { process?: { cwd?: () => string } }).process
  return proc?.cwd?.() ?? '.'
}

/**
 * Register Host filesystem RPC; volatile Config drives the fallback root.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export function apply(ctx: Context, config: Config): void {
  const configured = config.root.get().trim()
  const initialRoot = configured !== '' ? configured : defaultRoot()
  const service = new ExplorerFsService(ctx, initialRoot)

  ctx.on('loader/volatile-update', () => {
    const next = config.root.get().trim()
    if (next !== '') service.applySettingsRoot(next)
  })
}
