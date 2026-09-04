/** Host settings namespace for the file explorer plugin card. */

import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import {
  DEFAULT_FILE_EXPLORER_SETTINGS,
  FILE_EXPLORER_SETTINGS_NS,
  type FileExplorerSettings,
} from '../../shared/settings-contract.ts'

export const FILE_EXPLORER_NS = settingsNamespace(FILE_EXPLORER_SETTINGS_NS)

export const FileExplorerSettingsSchema: z<FileExplorerSettings> = z.object({
  root: z.string().default(''),
  openLinksInEditor: z.boolean().default(false),
})

/**
 * Register the `file-explorer` settings section (standalone helper for tests).
 * @param ctx - Host context with `settings`.
 * @param base - initial values (typically from Cordis Config).
 */
export function registerExplorerSettings(
  ctx: Context,
  base: FileExplorerSettings = DEFAULT_FILE_EXPLORER_SETTINGS,
): ReturnType<Context['settings']['register']> {
  return ctx.settings.register(FILE_EXPLORER_NS, FileExplorerSettingsSchema, { base })
}
