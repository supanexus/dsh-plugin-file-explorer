/** Cordis Config + plugin identity for the Host half. */
import z from '@deepseek-ai/schemastery';
/** Cordis plugin id (must match cordis.patch.yml). */
export const name = 'supanexus-file-explorer';
/** Settings service needed for volatile Config writes from the Client form. */
export const inject = ['settings'];
export const Config = z.object({
    root: z.string().default('').volatile(),
    openLinksInEditor: z.boolean().default(false).volatile(),
});
//# sourceMappingURL=config.js.map