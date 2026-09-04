/**
 * Host Typert service: filesystem operations constrained to a workspace root.
 *
 * Cordis exposes Services through a Proxy; Gateway invokes `@Remote` methods
 * with that Proxy (or a shadow) as `this`. Never touch state on the raw
 * receiver — unwrap via `symbols.original` first (same idea as Gateway's
 * `originalOf`). Do not use JS `#` private fields.
 */
import { type Context } from '@deepseek-ai/cordis';
import { TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol';
import { type FailResult, type ListOk, type OkResult, type ReadOk, type RootOk } from '../shared/rpc-contract.ts';
export type FsOpResult<T> = T | FailResult;
/**
 * Live explorer filesystem RPC. Root can be updated via `setRoot` or settings.
 */
export declare class ExplorerFsService extends TypertRemoteService {
    /** Absolute workspace root (public: Cordis Proxy must read/write freely). */
    root: string;
    /** Whether the current root was pinned from a session cwd. */
    pinned: boolean;
    constructor(ctx: Context, initialRoot: string);
    /** Absolute root currently in effect. */
    getRootPath(): string;
    /** Whether the current root was pinned from a session cwd. */
    isPinned(): boolean;
    /**
     * Apply a settings-driven root only when not session-pinned.
     */
    applySettingsRoot(root: string): void;
    /** Clear pin and fall back to the given settings root. */
    clearPin(fallbackRoot: string): void;
    getRoot(): Promise<RootOk>;
    setRoot(root: string): Promise<FsOpResult<RootOk>>;
    list(path: string): Promise<FsOpResult<ListOk>>;
    read(path: string): Promise<FsOpResult<ReadOk>>;
    write(path: string, content: string): Promise<FsOpResult<OkResult>>;
    mkdir(path: string): Promise<FsOpResult<OkResult>>;
    rename(from: string, to: string): Promise<FsOpResult<OkResult>>;
    /** Named `unlink` — Client remote forbids `remove` (Cordis Service.prototype). */
    unlink(path: string): Promise<FsOpResult<OkResult>>;
    /** Open the workspace root in the OS file manager (Finder / Explorer / xdg-open). */
    revealRoot(): Promise<FsOpResult<OkResult>>;
    /**
     * Open a workspace-relative path in the OS file manager.
     * Directories open as folders; files reveal their parent directory.
     */
    revealPath(path: string): Promise<FsOpResult<OkResult>>;
}
/** Basename helper for rename UI. */
export declare function entryBasename(relPath: string): string;
/** Parent relative path of a relative file path. */
export declare function entryParent(relPath: string): string;
//# sourceMappingURL=fs-service.d.ts.map