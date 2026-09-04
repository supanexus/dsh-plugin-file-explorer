/**
 * In-memory explorer mode flag (sidebar occupancy).
 * Subscribe API matches useSyncExternalStore (`() => void` listeners).
 */
export type ModeListener = () => void;
export declare class ExplorerModeStore {
    private enabled;
    private readonly listeners;
    getSnapshot: () => boolean;
    subscribe: (listener: ModeListener) => (() => void);
    setEnabled(next: boolean): void;
    toggle(): boolean;
}
//# sourceMappingURL=mode.d.ts.map