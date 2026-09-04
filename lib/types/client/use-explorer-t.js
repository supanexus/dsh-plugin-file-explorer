/** Subscribe to active locale and return an explorer translate function. */
import { useSyncExternalStore } from 'react';
import { explorerT } from "./locales.js";
/** Reactive `t` for file-explorer copy. */
export function useExplorerT(ctx) {
    const locale = useSyncExternalStore((listener) => ctx.locale.subscribe(listener), () => ctx.locale.getSnapshot().active);
    return explorerT(locale);
}
//# sourceMappingURL=use-explorer-t.js.map