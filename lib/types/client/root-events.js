/** Notify explorer UI after the Host workspace root is re-pinned. */
const listeners = new Set();
/** Subscribe to successful session/root pins. */
export function subscribeRootPinned(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}
/** Fire after `setRoot` succeeds so the tree reloads against the new cwd. */
export function notifyRootPinned() {
    for (const listener of listeners)
        listener();
}
//# sourceMappingURL=root-events.js.map
