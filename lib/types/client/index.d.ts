/**
 * Client half: Files tab fills the conversation viewArea (composer-overlay
 * contract) with a center tree | editor split. Left sidebar stays the
 * official workspace / conversation list (no sidebar.workspaces shadow).
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis';
export declare const VIEW_ID = "file-explorer";
/** Required client services before apply runs. */
export declare const inject: string[];
/**
 * Mount remotes and register UI slots.
 * @param ctx - Client root context.
 */
export declare function apply(ctx: ClientContext): Promise<void>;
//# sourceMappingURL=index.d.ts.map