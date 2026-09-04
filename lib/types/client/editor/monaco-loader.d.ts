/**
 * Load Monaco from jsDelivr; callers fall back to textarea on failure.
 */
export interface MonacoEditorApi {
    readonly getValue: () => string;
    readonly setValue: (value: string) => void;
    readonly onDidChangeModelContent: (listener: () => void) => {
        dispose: () => void;
    };
    readonly dispose: () => void;
    readonly layout: () => void;
    readonly updateOptions: (options: Record<string, unknown>) => void;
}
export interface MonacoNamespace {
    editor: {
        create: (container: HTMLElement, options: Record<string, unknown>) => MonacoEditorApi;
        setTheme: (theme: string) => void;
        defineTheme: (name: string, themeData: Record<string, unknown>) => void;
    };
}
declare global {
    interface Window {
        require?: {
            config: (options: {
                paths: Record<string, string>;
            }) => void;
            (modules: string[], callback: (monaco: MonacoNamespace) => void): void;
        };
        monaco?: MonacoNamespace;
    }
}
/**
 * Ensure Monaco AMD loader + editor are available.
 */
export declare function loadMonaco(): Promise<MonacoNamespace>;
/** Map a relative path to a Monaco language id. */
export declare function languageForPath(path: string): string;
//# sourceMappingURL=monaco-loader.d.ts.map