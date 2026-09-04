/**
 * Per-path markdown preview vs source mode (in-memory only).
 */
export type MdMode = 'source' | 'preview';
export type MdModeListener = () => void;
export declare function isMarkdownPath(path: string): boolean;
/**
 * Remember preview/source preference per path for the session.
 */
export declare class MdModeStore {
    #private;
    subscribe: (listener: MdModeListener) => (() => void);
    get(path: string): MdMode;
    set(path: string, mode: MdMode): void;
    toggle(path: string): MdMode;
    rename(from: string, to: string): void;
    drop(path: string): void;
}
//# sourceMappingURL=md-mode.d.ts.map