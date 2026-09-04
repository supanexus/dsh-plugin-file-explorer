/**
 * Resolve a relative path under a root and reject escapes.
 */
export interface GuardOk {
    readonly ok: true;
    /** Absolute path after resolve(root, rel). */
    readonly absolute: string;
    /** Normalized relative path ('' for root). */
    readonly relative: string;
}
export interface GuardFail {
    readonly ok: false;
    readonly reason: 'OUT_OF_ROOT' | 'INVALID';
}
export type GuardResult = GuardOk | GuardFail;
/**
 * Normalize a caller-supplied relative path (no leading slash expected).
 * Absolute inputs are rejected as INVALID (callers must use relative paths).
 */
export declare function normalizeRelativeInput(input: string): string | null;
/**
 * Resolve `rel` under `root`. Both `resolve` and optional `realpath` results
 * must remain inside root.
 * @param root - absolute workspace root
 * @param relInput - relative path from the client
 * @param realpath - optional realpath resolver for symlink checks
 */
export declare function guardPath(root: string, relInput: string, realpath?: (absolute: string) => string): GuardResult;
/** True when `candidate` is `root` or a descendant. */
export declare function isInsideRoot(root: string, candidate: string): boolean;
//# sourceMappingURL=path-guard.d.ts.map