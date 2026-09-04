/**
 * Per-path markdown preview vs source mode (in-memory only).
 */
export function isMarkdownPath(path) {
    const lower = path.toLowerCase();
    return lower.endsWith('.md') || lower.endsWith('.markdown');
}
/**
 * Remember preview/source preference per path for the session.
 */
export class MdModeStore {
    #modes = new Map();
    #listeners = new Set();
    subscribe = (listener) => {
        this.#listeners.add(listener);
        return () => {
            this.#listeners.delete(listener);
        };
    };
    get(path) {
        return this.#modes.get(path) ?? 'source';
    }
    set(path, mode) {
        this.#modes.set(path, mode);
        this.#emit();
    }
    toggle(path) {
        const next = this.get(path) === 'preview' ? 'source' : 'preview';
        this.set(path, next);
        return next;
    }
    rename(from, to) {
        const mode = this.#modes.get(from);
        if (mode === undefined)
            return;
        this.#modes.delete(from);
        this.#modes.set(to, mode);
        this.#emit();
    }
    drop(path) {
        if (!this.#modes.delete(path))
            return;
        this.#emit();
    }
    #emit() {
        for (const listener of this.#listeners)
            listener();
    }
}
//# sourceMappingURL=md-mode.js.map