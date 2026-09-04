/**
 * File explorer plugin — Host half.
 */
import type { Context } from '@deepseek-ai/cordis';
import { type Config } from './host/config.ts';
export { Config, name, inject } from './host/config.ts';
/**
 * Register Host filesystem RPC and settings namespace.
 * @param ctx - Host plugin context.
 * @param config - Cordis row configuration.
 */
export declare function apply(ctx: Context, config: Config): void;
//# sourceMappingURL=index.d.ts.map