/** Settings namespace contract visible to both Host and Client. */

/**
 * Profile entry id from `cordis.patch.yml` (`supanexus-file-explorer`).
 * dsh ≥ 0.1.7 projects volatile Config under this id into `configForms`.
 */
export const FILE_EXPLORER_SETTINGS_NS = 'supanexus-file-explorer' as const

export interface FileExplorerSettings {
  /** Fallback workspace root before a session cwd pin. */
  readonly root: string
  /** Route conversation file-path links into the editor. */
  readonly openLinksInEditor: boolean
}

export const DEFAULT_FILE_EXPLORER_SETTINGS: FileExplorerSettings = {
  root: '',
  openLinksInEditor: false,
}
