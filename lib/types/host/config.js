/** Cordis Config + plugin identity for the Host half. */
import z from '@deepseek-ai/schemastery';
/** Cordis plugin id (must match cordis.patch.yml). */
export const name = 'supanexus-file-explorer';
/** No required services at fiber start; settings injected nested. */
export const inject = [];
export const Config = z.object({
    root: z.string().default(''),
    openLinksInEditor: z.boolean().default(false),
});
//# sourceMappingURL=config.js.map