/** Locales for the file explorer plugin. */
export declare const NS: "file-explorer";
export type ExplorerKey = 'viewLabel' | 'emptyWorkspace' | 'settingsTitle' | 'settingsDescription' | 'settingsRoot' | 'settingsRootHint' | 'settingsOpenLinks' | 'settingsOpenLinksHint' | 'expand' | 'collapse' | 'expandAll' | 'collapseAll' | 'readOnly' | 'newFile' | 'newFolder' | 'refresh' | 'rename' | 'delete' | 'promptNewFile' | 'promptNewFolder' | 'promptRename' | 'confirmDelete' | 'openInFileManager' | 'revealPathInFileManager' | 'tabClose' | 'tabCloseRight' | 'tabCloseAll' | 'confirmCloseDirty' | 'editorEmpty' | 'editorSave' | 'editorSource' | 'editorPreview' | 'editorSaved' | 'editorTextareaMode' | 'treeAriaLabel' | 'editorAppearance' | 'editorTheme' | 'editorThemeDark' | 'editorThemeLight' | 'editorThemeHighContrast' | 'editorFontSize' | 'editorFontSmaller' | 'editorFontLarger' | 'editorCustomColor' | 'editorCustomColorHint' | 'editorCustomColorInvalid' | 'editorCustomColorClear' | 'editorScheme' | 'editorSchemeSave' | 'editorSchemeEmpty' | 'editorSchemeRemove' | 'editorFilePath';
export declare const dictionaries: {
    zh: Record<ExplorerKey, string>;
    en: Record<ExplorerKey, string>;
};
export type ExplorerTranslate = (key: ExplorerKey, vars?: Record<string, string>) => string;
export declare function explorerT(locale: string): ExplorerTranslate;
//# sourceMappingURL=locales.d.ts.map