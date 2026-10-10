/** Host settings helpers retained for tests (volatile Config is the source of truth). */
import { FILE_EXPLORER_SETTINGS_NS } from "../../shared/settings-contract.js";
/** @deprecated Prefer profile entry id {@link FILE_EXPLORER_SETTINGS_NS}. */
export const FILE_EXPLORER_NS = FILE_EXPLORER_SETTINGS_NS;
/**
 * No-op placeholder: dsh ≥ 0.1.7 projects volatile Config automatically.
 * Kept so older tests that imported the helper still compile.
 */
export function registerExplorerSettings(_ctx, _base) {
    return () => { };
}
//# sourceMappingURL=schema.js.map