/**
 * Client Typert contribution + typed call helpers for `explorerFs`.
 */
import { z } from 'zod';
import { EXPLORER_FS_SERVICE, } from "../shared/rpc-contract.js";
const FailCode = z.enum([
    'OUT_OF_ROOT',
    'NOT_FOUND',
    'NOT_EMPTY',
    'EXISTS',
    'IS_BINARY',
    'IS_DIR',
    'IO',
]);
const FailResultSchema = z.object({
    ok: z.literal(false),
    code: FailCode,
    message: z.string(),
});
const OkResultSchema = z.object({ ok: z.literal(true) });
const RootOkSchema = z.object({ ok: z.literal(true), root: z.string() });
const FsEntrySchema = z.object({
    name: z.string(),
    path: z.string(),
    kind: z.enum(['file', 'dir']),
    size: z.number().optional(),
});
const ListOkSchema = z.object({ ok: z.literal(true), entries: z.array(FsEntrySchema) });
const ReadOkSchema = z.object({ ok: z.literal(true), content: z.string() });
const RootResultSchema = z.union([RootOkSchema, FailResultSchema]);
const ListResultSchema = z.union([ListOkSchema, FailResultSchema]);
const ReadResultSchema = z.union([ReadOkSchema, FailResultSchema]);
const MutateResultSchema = z.union([OkResultSchema, FailResultSchema]);
const PKG = '@supanexus/dsh-plugin-file-explorer';
const Str = z.string();
function strParam(name) {
    return {
        name,
        wire: name,
        source: 'json',
        codec: {
            mode: 'strict',
            typeSymbol: `${PKG}/types#String`,
            schema: Str,
        },
    };
}
function resultCodec(schema, typeSymbol) {
    return {
        mode: 'strict',
        typeSymbol: `${PKG}/types#${typeSymbol}`,
        schema,
    };
}
function invocation(method, parameters, result) {
    return {
        id: `${PKG}#${EXPLORER_FS_SERVICE}/${method}`,
        service: EXPLORER_FS_SERVICE,
        namespace: EXPLORER_FS_SERVICE,
        method,
        invocation: { kind: 'direct' },
        parameters,
        result,
    };
}
/** Strict Client contribution mounted via `ctx.remote.$mount`. */
export const TYPERT_REMOTE = {
    package: PKG,
    descriptors: [
        invocation('getRoot', [], resultCodec(RootOkSchema, 'RootOk')),
        invocation('setRoot', [strParam('root')], resultCodec(RootResultSchema, 'RootResult')),
        invocation('list', [strParam('path')], resultCodec(ListResultSchema, 'ListResult')),
        invocation('read', [strParam('path')], resultCodec(ReadResultSchema, 'ReadResult')),
        invocation('write', [strParam('path'), strParam('content')], resultCodec(MutateResultSchema, 'MutateResult')),
        invocation('mkdir', [strParam('path')], resultCodec(MutateResultSchema, 'MutateResult')),
        invocation('rename', [strParam('from'), strParam('to')], resultCodec(MutateResultSchema, 'MutateResult')),
        invocation('unlink', [strParam('path')], resultCodec(MutateResultSchema, 'MutateResult')),
        invocation('revealRoot', [], resultCodec(MutateResultSchema, 'MutateResult')),
        invocation('revealPath', [strParam('path')], resultCodec(MutateResultSchema, 'MutateResult')),
    ],
};
async function unwrap(promise) {
    const result = await promise;
    if (!result.ok) {
        return {
            ok: false,
            error: { kind: 'transport', message: result.error.message },
        };
    }
    const value = result.value;
    if (typeof value === 'object' && value !== null && 'ok' in value && value.ok === false) {
        const fail = value;
        return {
            ok: false,
            error: { kind: 'business', message: fail.message, code: fail.code },
        };
    }
    return { ok: true, value: value };
}
/** Thin helpers over `ctx.remote.explorerFs` after mount. */
export function createExplorerApi(ctx) {
    const remote = () => ctx.remote.explorerFs;
    return {
        getRoot: () => unwrap(remote().getRoot()),
        setRoot: (root) => unwrap(remote().setRoot(root)),
        list: (path) => unwrap(remote().list(path)),
        read: (path) => unwrap(remote().read(path)),
        write: (path, content) => unwrap(remote().write(path, content)),
        mkdir: (path) => unwrap(remote().mkdir(path)),
        rename: (from, to) => unwrap(remote().rename(from, to)),
        unlink: (path) => unwrap(remote().unlink(path)),
        revealRoot: () => unwrap(remote().revealRoot()),
        revealPath: (path) => unwrap(remote().revealPath(path)),
    };
}
//# sourceMappingURL=rpc.js.map