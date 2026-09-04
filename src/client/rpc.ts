/**
 * Client Typert contribution + typed call helpers for `explorerFs`.
 */

import { z } from 'zod'
import type { Context } from '@deepseek-ai/cordis'
import type {
  RemoteResult,
  TypertRemoteContribution,
} from '@deepseek-ai/dsh-typert-protocol'
import {
  EXPLORER_FS_SERVICE,
  type FailResult,
  type FsEntry,
  type ListOk,
  type OkResult,
  type ReadOk,
  type RootOk,
} from '../shared/rpc-contract.ts'

const FailCode = z.enum([
  'OUT_OF_ROOT',
  'NOT_FOUND',
  'NOT_EMPTY',
  'EXISTS',
  'IS_BINARY',
  'IS_DIR',
  'IO',
])

const FailResultSchema = z.object({
  ok: z.literal(false),
  code: FailCode,
  message: z.string(),
})

const OkResultSchema = z.object({ ok: z.literal(true) })
const RootOkSchema = z.object({ ok: z.literal(true), root: z.string() })
const FsEntrySchema = z.object({
  name: z.string(),
  path: z.string(),
  kind: z.enum(['file', 'dir']),
  size: z.number().optional(),
})
const ListOkSchema = z.object({ ok: z.literal(true), entries: z.array(FsEntrySchema) })
const ReadOkSchema = z.object({ ok: z.literal(true), content: z.string() })

const RootResultSchema = z.union([RootOkSchema, FailResultSchema])
const ListResultSchema = z.union([ListOkSchema, FailResultSchema])
const ReadResultSchema = z.union([ReadOkSchema, FailResultSchema])
const MutateResultSchema = z.union([OkResultSchema, FailResultSchema])

const PKG = '@supanexus/dsh-plugin-file-explorer'
const Str = z.string()

function strParam(name: string) {
  return {
    name,
    wire: name,
    source: 'json' as const,
    codec: {
      mode: 'strict' as const,
      typeSymbol: `${PKG}/types#String`,
      schema: Str,
    },
  }
}

function resultCodec(schema: z.ZodType, typeSymbol: string) {
  return {
    mode: 'strict' as const,
    typeSymbol: `${PKG}/types#${typeSymbol}`,
    schema,
  }
}

function invocation(
  method: string,
  parameters: ReturnType<typeof strParam>[],
  result: ReturnType<typeof resultCodec>,
) {
  return {
    id: `${PKG}#${EXPLORER_FS_SERVICE}/${method}`,
    service: EXPLORER_FS_SERVICE,
    namespace: EXPLORER_FS_SERVICE,
    method,
    invocation: { kind: 'direct' as const },
    parameters,
    result,
  }
}

/** Strict Client contribution mounted via `ctx.remote.$mount`. */
export const TYPERT_REMOTE: TypertRemoteContribution = {
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
}

declare module '@deepseek-ai/dsh-typert-protocol' {
  interface TypertRemoteNamespaceMap {
    readonly explorerFs: ExplorerFsRemote
  }
}

export interface ExplorerFsRemote {
  getRoot(signal?: AbortSignal): Promise<RemoteResult<RootOk>>
  setRoot(root: string, signal?: AbortSignal): Promise<RemoteResult<RootOk | FailResult>>
  list(path: string, signal?: AbortSignal): Promise<RemoteResult<ListOk | FailResult>>
  read(path: string, signal?: AbortSignal): Promise<RemoteResult<ReadOk | FailResult>>
  write(path: string, content: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
  mkdir(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
  rename(from: string, to: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
  unlink(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
  revealRoot(signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
  revealPath(path: string, signal?: AbortSignal): Promise<RemoteResult<OkResult | FailResult>>
}

export type ExplorerCallError = {
  readonly kind: 'transport' | 'business'
  readonly message: string
  readonly code?: FailResult['code']
}

export type ExplorerCallResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: ExplorerCallError }

async function unwrap<T>(
  promise: Promise<RemoteResult<T | FailResult>>,
): Promise<ExplorerCallResult<Exclude<T, FailResult>>> {
  const result = await promise
  if (!result.ok) {
    return {
      ok: false,
      error: { kind: 'transport', message: result.error.message },
    }
  }
  const value = result.value
  if (typeof value === 'object' && value !== null && 'ok' in value && (value as { ok: boolean }).ok === false) {
    const fail = value as FailResult
    return {
      ok: false,
      error: { kind: 'business', message: fail.message, code: fail.code },
    }
  }
  return { ok: true, value: value as Exclude<T, FailResult> }
}

/** Thin helpers over `ctx.remote.explorerFs` after mount. */
export function createExplorerApi(ctx: Context) {
  const remote = () => (ctx as Context & { remote: { explorerFs: ExplorerFsRemote } }).remote.explorerFs
  return {
    getRoot: () => unwrap(remote().getRoot()),
    setRoot: (root: string) => unwrap(remote().setRoot(root)),
    list: (path: string) => unwrap(remote().list(path)),
    read: (path: string) => unwrap(remote().read(path)),
    write: (path: string, content: string) => unwrap(remote().write(path, content)),
    mkdir: (path: string) => unwrap(remote().mkdir(path)),
    rename: (from: string, to: string) => unwrap(remote().rename(from, to)),
    unlink: (path: string) => unwrap(remote().unlink(path)),
    revealRoot: () => unwrap(remote().revealRoot()),
    revealPath: (path: string) => unwrap(remote().revealPath(path)),
  }
}

export type ExplorerApi = ReturnType<typeof createExplorerApi>

export type { FsEntry }
