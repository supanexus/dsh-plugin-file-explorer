/** Shared RPC DTOs and fail codes for `explorerFs`. */
export const EXPLORER_FS_SERVICE = 'explorerFs';
export function fail(code, message) {
    return { ok: false, code, message };
}
//# sourceMappingURL=rpc-contract.js.map