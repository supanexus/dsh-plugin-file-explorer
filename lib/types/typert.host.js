/**
 * Hand-written Host Typert face for packages outside the engine generator graph.
 * Loaded via package.json exports["./typert"].
 *
 * Must be self-contained: the loader imports this file alone from the packed
 * package (package.json `files` may omit other lib/types/*.js modules).
 */
import { z } from 'zod';
const EXPLORER_FS_SERVICE = 'explorerFs';
const FailCode = z.enum([
    'OUT_OF_ROOT',
    'NOT_FOUND',
    'NOT_EMPTY',
    'EXISTS',
    'IS_BINARY',
    'IS_DIR',
    'IO',
]);
const FailResult = z.object({
    ok: z.literal(false),
    code: FailCode,
    message: z.string(),
});
const OkResult = z.object({ ok: z.literal(true) });
const RootOk = z.object({ ok: z.literal(true), root: z.string() });
const FsEntry = z.object({
    name: z.string(),
    path: z.string(),
    kind: z.enum(['file', 'dir']),
    size: z.number().optional(),
});
const ListOk = z.object({ ok: z.literal(true), entries: z.array(FsEntry) });
const ReadOk = z.object({ ok: z.literal(true), content: z.string() });
const RootResult = z.union([RootOk, FailResult]);
const ListResult = z.union([ListOk, FailResult]);
const ReadResult = z.union([ReadOk, FailResult]);
const MutateResult = z.union([OkResult, FailResult]);
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
            create: () => Str,
        },
    };
}
function resultCodec(schema, typeSymbol) {
    return {
        mode: 'strict',
        typeSymbol: `${PKG}/types#${typeSymbol}`,
        create: () => schema,
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
        sourceLocation: { file: 'src/host/fs-service.ts', line: 1, column: 1 },
    };
}
/** Host Typert contribution consumed by typert-loader. */
export const TYPERT = {
    package: PKG,
    face: 'host',
    schemas: [],
    model: { services: [], events: [], objects: [] },
    invocations: [
        invocation('getRoot', [], resultCodec(RootOk, 'RootOk')),
        invocation('setRoot', [strParam('root')], resultCodec(RootResult, 'RootResult')),
        invocation('list', [strParam('path')], resultCodec(ListResult, 'ListResult')),
        invocation('read', [strParam('path')], resultCodec(ReadResult, 'ReadResult')),
        invocation('write', [strParam('path'), strParam('content')], resultCodec(MutateResult, 'MutateResult')),
        invocation('mkdir', [strParam('path')], resultCodec(MutateResult, 'MutateResult')),
        invocation('rename', [strParam('from'), strParam('to')], resultCodec(MutateResult, 'MutateResult')),
        invocation('unlink', [strParam('path')], resultCodec(MutateResult, 'MutateResult')),
        invocation('revealRoot', [], resultCodec(MutateResult, 'MutateResult')),
        invocation('revealPath', [strParam('path')], resultCodec(MutateResult, 'MutateResult')),
    ],
};
export default TYPERT;
//# sourceMappingURL=typert.host.js.map