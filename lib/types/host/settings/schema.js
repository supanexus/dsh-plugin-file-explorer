/** Host settings namespace for the file explorer plugin card. */
import z from '@deepseek-ai/schemastery';
import { settingsNamespace } from '@deepseek-ai/dsh-settings';
import { DEFAULT_FILE_EXPLORER_SETTINGS, FILE_EXPLORER_SETTINGS_NS, } from "../../shared/settings-contract.js";
export const FILE_EXPLORER_NS = settingsNamespace(FILE_EXPLORER_SETTINGS_NS);
export const FileExplorerSettingsSchema = z.object({
    root: z.string().default(''),
    openLinksInEditor: z.boolean().default(false),
});
/**
 * Register the `file-explorer` settings section (standalone helper for tests).
 * @param ctx - Host context with `settings`.
 * @param base - initial values (typically from Cordis Config).
 */
export function registerExplorerSettings(ctx, base = DEFAULT_FILE_EXPLORER_SETTINGS) {
    return ctx.settings.register(FILE_EXPLORER_NS, FileExplorerSettingsSchema, { base });
}
//# sourceMappingURL=schema.js.map