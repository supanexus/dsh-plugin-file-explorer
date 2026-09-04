/**
 * Pin explorer root to the current session cwd when available.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { ExplorerApi } from './rpc.ts';
import type { ExplorerModeStore } from './state/mode.ts';
/**
 * Keep host root aligned with session cwd while explorer mode is on.
 * Re-syncs when the session changes or when mode turns on.
 * @returns disposer.
 */
export declare function installSessionRootPin(ctx: Context, api: ExplorerApi, mode: ExplorerModeStore): () => void;
//# sourceMappingURL=session-pin.d.ts.map