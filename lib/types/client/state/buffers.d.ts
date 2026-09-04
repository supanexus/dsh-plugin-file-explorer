/**
 * Per-path editor buffers and dirty tracking.
 */
export interface BufferEntry {
    readonly path: string;
    readonly content: string;
    readonly savedContent: string;
}
export type BuffersListener = () => void;
/**
 * Text buffers keyed by relative path.
 */
export declare class BuffersStore {
    #private;
    subscribe: (listener: BuffersListener) => (() => void);
    get(path: string): BufferEntry | undefined;
    /** Load or replace buffer from a successful read. Clears dirty. */
    load(path: string, content: string): void;
    /** Update draft content; dirty when content !== savedContent. */
    setContent(path: string, content: string): void;
    /** Mark current content as saved (after successful write). */
    markSaved(path: string): void;
    isDirty(path: string): boolean;
    drop(path: string): void;
    /** Move buffer after rename. */
    rename(from: string, to: string): void;
}
//# sourceMappingURL=buffers.d.ts.map