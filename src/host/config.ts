/** Cordis Config + plugin identity for the Host half. */

import z from '@deepseek-ai/schemastery'

/** Cordis plugin id (must match cordis.patch.yml). */
export const name = 'supanexus-file-explorer'

/** No required services at fiber start; settings injected nested. */
export const inject = [] as const

/** Bundle configuration from cordis.patch.yml. */
export interface Config {
  /** Fallback workspace root before a session pin. */
  root: string
  /** Route conversation file-path links into the editor. */
  openLinksInEditor: boolean
}

export const Config: z<Config> = z.object({
  root: z.string().default(''),
  openLinksInEditor: z.boolean().default(false),
})
