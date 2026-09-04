/**
 * Client Typert contribution + typed call helpers for `explorerFs`.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { RemoteResult, TypertRemoteContribution } from '@deepseek-ai/dsh-typert-protocol';
import { type FailResult, type FsEntry, type ListOk, type OkResult, type ReadOk, type RootOk } from '../shared/rpc-contract.ts';
/** Strict Client contribution mounted via `ctx.remote.$mount`. */
export declare const TYPERT_REMOTE: TypertRemoteContribution;
declare module '@deepseek-ai/dsh-typert-protocol' {
    interface TypertRemoteNamespaceMap {
        readonly explorerFs: ExplorerFsRemote;
    }
}
export interface ExplorerFsRemote {
    getRoot(signal?: AbortSignal): Promise<RemoteResult<RootOk>>;
    setRoot(root: string, signal?: AbortSignal): Promise<RemoteResult<RootOk | FailResult>>;
    list(path: string, signal?: AbortSignal): Promise<RemoteResult<ListOk | FailResult>>;
    read(path: string, signal?: AbortSignal): Promise<RemoteResult<ReadOk | FailResult>>;
    write(path: string, content: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
    mkdir(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
    rename(from: string, to: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
    unlink(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
    revealRoot(signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
    revealPath(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>;
}
export type ExplorerCallError = {
    readonly kind: 'transport' | 'business';
    readonly message: string;
    readonly code?: FailResult['code'];
};
export type ExplorerCallResult<T> = {
    readonly ok: true;
    readonly value: T;
} | {
    readonly ok: false;
    readonly error: ExplorerCallError;
};
/** Thin helpers over `ctx.remote.explorerFs` after mount. */
export declare function createExplorerApi(ctx: Context): {
    getRoot: () => Promise<ExplorerCallResult<RootOk>>;
    setRoot: (root: string) => Promise<ExplorerCallResult<RootOk>>;
    list: (path: string) => Promise<ExplorerCallResult<ListOk>>;
    read: (path: string) => Promise<ExplorerCallResult<ReadOk>>;
    write: (path: string, content: string) => Promise<ExplorerCallResult<OkResult>>;
    mkdir: (path: string) => Promise<ExplorerCallResult<OkResult>>;
    rename: (from: string, to: string) => Promise<ExplorerCallResult<OkResult>>;
    unlink: (path: string) => Promise<ExplorerCallResult<OkResult>>;
    revealRoot: () => Promise<ExplorerCallResult<OkResult>>;
    revealPath: (path: string) => Promise<ExplorerCallResult<OkResult>>;
};
export type ExplorerApi = ReturnType<typeof createExplorerApi>;
export type { FsEntry };
//# sourceMappingURL=rpc.d.ts.map