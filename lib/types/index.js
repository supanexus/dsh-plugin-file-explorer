/**
 * File explorer plugin — Host half.
 */
import { ExplorerFsService } from "./host/fs-service.js";
import { FILE_EXPLORER_NS, FileExplorerSettingsSchema, } from "./host/settings/schema.js";
export { Config, name, inject } from "./host/config.js";
function defaultRoot() {
    // Host Cordis runs under Node; client-build-environment stubs `process` without cwd.
    const proc = globalThis.process;
    return proc?.cwd?.() ?? '.';
}
/**
 * Register Host filesystem RPC and settings namespace.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export function apply(ctx, config) {
    const initialRoot = config.root.trim() !== '' ? config.root : defaultRoot();
    const service = new ExplorerFsService(ctx, initialRoot);
    const base = {
        root: initialRoot,
        openLinksInEditor: config.openLinksInEditor,
    };
    ctx.inject(['settings'], (settingsCtx) => {
        const scope = settingsCtx.settings.register(FILE_EXPLORER_NS, FileExplorerSettingsSchema, { base });
        service.applySettingsRoot(scope.get().root);
        settingsCtx.effect(() => scope.watch((next) => {
            service.applySettingsRoot(next.root);
        }), 'supanexus-file-explorer: settings root');
    });
}
//# sourceMappingURL=index.js.map