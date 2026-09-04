/** Settings namespace contract visible to both Host and Client. */
/** Must match Host settingsNamespace pattern /^[a-z][a-z0-9-]*$/. */
export declare const FILE_EXPLORER_SETTINGS_NS: "file-explorer";
export interface FileExplorerSettings {
    /** Fallback workspace root before a session cwd pin. */
    readonly root: string;
    /** Route conversation file-path links into the editor. */
    readonly openLinksInEditor: boolean;
}
export declare const DEFAULT_FILE_EXPLORER_SETTINGS: FileExplorerSettings;
//# sourceMappingURL=settings-contract.d.ts.map