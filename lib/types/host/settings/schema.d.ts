/** Host settings namespace for the file explorer plugin card. */
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import { type FileExplorerSettings } from '../../shared/settings-contract.ts';
export declare const FILE_EXPLORER_NS: import("@deepseek-ai/dsh-settings").SettingsNamespace;
export declare const FileExplorerSettingsSchema: z<FileExplorerSettings>;
/**
 * Register the `file-explorer` settings section (standalone helper for tests).
 * @param ctx - Host context with `settings`.
 * @param base - initial values (typically from Cordis Config).
 */
export declare function registerExplorerSettings(ctx: Context, base?: FileExplorerSettings): ReturnType<Context['settings']['register']>;
//# sourceMappingURL=schema.d.ts.map