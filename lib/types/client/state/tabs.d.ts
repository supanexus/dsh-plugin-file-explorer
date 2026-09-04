/**
 * Client-side tab roster for the file explorer editor.
 *
 * `getSnapshot` MUST return a stable reference between mutations — React's
 * useSyncExternalStore infinite-loops if every call allocates a new object.
 */
export interface EditorTab {
    readonly path: string;
    readonly title: string;
}
export interface TabsState {
    readonly open: readonly EditorTab[];
    readonly activePath: string | null;
}
export type TabsListener = () => void;
/**
 * Mutable tab roster with subscribe semantics for React.
 */
export declare class TabsStore {
    #private;
    getSnapshot: () => TabsState;
    subscribe: (listener: TabsListener) => (() => void);
    /** Open or activate a path. Returns whether a new tab was created. */
    open(path: string): boolean;
    activate(path: string): void;
    /**
     * Close a tab. Activates neighbor to the right, else left, else null.
     * @returns whether the tab was present.
     */
    close(path: string): boolean;
    /** Rename an open tab path (after a successful host rename). */
    rename(from: string, to: string): void;
}
//# sourceMappingURL=tabs.d.ts.map