/**
 * File explorer plugin — Host half.
 */
import { ExplorerFsService } from "./host/fs-service.js";
export { Config, name, inject } from "./host/config.js";
function defaultRoot() {
    // Host Cordis runs under Node; client-build-environment stubs `process` without cwd.
    const proc = globalThis.process;
    return proc?.cwd?.() ?? '.';
}
/**
 * Register Host filesystem RPC; volatile Config drives the fallback root.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export function apply(ctx, config) {
    const configured = config.root.get().trim();
    const initialRoot = configured !== '' ? configured : defaultRoot();
    const service = new ExplorerFsService(ctx, initialRoot);
    ctx.on('loader/volatile-update', () => {
        const next = config.root.get().trim();
        if (next !== '')
            service.applySettingsRoot(next);
    });
}
//# sourceMappingURL=index.js.map