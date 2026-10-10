/** Host settings helpers retained for tests (volatile Config is the source of truth). */
import type { Context } from '@deepseek-ai/cordis';
import type { FileExplorerSettings } from '../../shared/settings-contract.ts';
/** @deprecated Prefer profile entry id {@link FILE_EXPLORER_SETTINGS_NS}. */
export declare const FILE_EXPLORER_NS: "supanexus-file-explorer";
/**
 * No-op placeholder: dsh ≥ 0.1.7 projects volatile Config automatically.
 * Kept so older tests that imported the helper still compile.
 */
export declare function registerExplorerSettings(_ctx: Context, _base?: FileExplorerSettings): () => void;
//# sourceMappingURL=schema.d.ts.map