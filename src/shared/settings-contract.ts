/** Settings namespace contract visible to both Host and Client. */

/** Must match Host settingsNamespace pattern /^[a-z][a-z0-9-]*$/. */
export const FILE_EXPLORER_SETTINGS_NS = 'file-explorer' as const

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
