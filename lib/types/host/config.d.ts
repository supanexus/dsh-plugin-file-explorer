/** Cordis Config + plugin identity for the Host half. */
import type { Volatile } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
/** Cordis plugin id (must match cordis.patch.yml). */
export declare const name = "supanexus-file-explorer";
/** Settings service needed for volatile Config writes from the Client form. */
export declare const inject: readonly ["settings"];
/** Bundle configuration from cordis.patch.yml. */
export interface Config {
    /** Fallback workspace root before a session pin. */
    root: Volatile<string>;
    /** Route conversation file-path links into the editor. */
    openLinksInEditor: Volatile<boolean>;
}
export declare const Config: z<Config>;
//# sourceMappingURL=config.d.ts.map