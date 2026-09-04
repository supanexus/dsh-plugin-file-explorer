/**
 * File explorer plugin — Host half.
 */

import type { Context } from '@deepseek-ai/cordis'
import { ExplorerFsService } from './host/fs-service.ts'
import { type Config } from './host/config.ts'
import {
  FILE_EXPLORER_NS,
  FileExplorerSettingsSchema,
} from './host/settings/schema.ts'
import type { FileExplorerSettings } from './shared/settings-contract.ts'

export { Config, name, inject } from './host/config.ts'

function defaultRoot(): string {
  // Host Cordis runs under Node; client-build-environment stubs `process` without cwd.
  const proc = (globalThis as { process?: { cwd?: () => string } }).process
  return proc?.cwd?.() ?? '.'
}

/**
 * Register Host filesystem RPC and settings namespace.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export function apply(ctx: Context, config: Config): void {
  const initialRoot = config.root.trim() !== '' ? config.root : defaultRoot()
  const service = new ExplorerFsService(ctx, initialRoot)

  const base: FileExplorerSettings = {
    root: initialRoot,
    openLinksInEditor: config.openLinksInEditor,
  }

  ctx.inject(['settings'], (settingsCtx) => {
    const scope = settingsCtx.settings.register(
      FILE_EXPLORER_NS,
      FileExplorerSettingsSchema,
      { base },
    )
    service.applySettingsRoot(scope.get().root)
    settingsCtx.effect(
      () => scope.watch((next) => {
        service.applySettingsRoot(next.root)
      }),
      'supanexus-file-explorer: settings root',
    )
  })
}
