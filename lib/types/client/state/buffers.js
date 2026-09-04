/**
 * Per-path editor buffers and dirty tracking.
 */
/**
 * Text buffers keyed by relative path.
 */
export class BuffersStore {
    #map = new Map();
    #listeners = new Set();
    subscribe = (listener) => {
        this.#listeners.add(listener);
        return () => {
            this.#listeners.delete(listener);
        };
    };
    get(path) {
        return this.#map.get(path);
    }
    /** Load or replace buffer from a successful read. Clears dirty. */
    load(path, content) {
        this.#map.set(path, { path, content, savedContent: content });
        this.#emit();
    }
    /** Update draft content; dirty when content !== savedContent. */
    setContent(path, content) {
        const prev = this.#map.get(path);
        if (prev !== undefined && prev.content === content)
            return;
        if (prev === undefined) {
            this.#map.set(path, { path, content, savedContent: content });
        }
        else {
            this.#map.set(path, { ...prev, content });
        }
        this.#emit();
    }
    /** Mark current content as saved (after successful write). */
    markSaved(path) {
        const prev = this.#map.get(path);
        if (prev === undefined)
            return;
        this.#map.set(path, { ...prev, savedContent: prev.content });
        this.#emit();
    }
    isDirty(path) {
        const entry = this.#map.get(path);
        if (entry === undefined)
            return false;
        return entry.content !== entry.savedContent;
    }
    drop(path) {
        if (!this.#map.delete(path))
            return;
        this.#emit();
    }
    /** Move buffer after rename. */
    rename(from, to) {
        const prev = this.#map.get(from);
        if (prev === undefined)
            return;
        this.#map.delete(from);
        this.#map.set(to, { ...prev, path: to });
        this.#emit();
    }
    #emit() {
        for (const listener of this.#listeners)
            listener();
    }
}
//# sourceMappingURL=buffers.js.map