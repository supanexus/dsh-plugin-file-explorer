/** Shared RPC DTOs and fail codes for `explorerFs`. */

export const EXPLORER_FS_SERVICE = 'explorerFs' as const

export type EntryKind = 'file' | 'dir'

export interface FsEntry {
  readonly name: string
  /** Relative to root; empty string means the root itself. */
  readonly path: string
  readonly kind: EntryKind
  readonly size?: number
}

export type FailCode =
  | 'OUT_OF_ROOT'
  | 'NOT_FOUND'
  | 'NOT_EMPTY'
  | 'EXISTS'
  | 'IS_BINARY'
  | 'IS_DIR'
  | 'IO'

export interface FailResult {
  readonly ok: false
  readonly code: FailCode
  readonly message: string
}

export interface OkResult {
  readonly ok: true
}

export interface RootOk {
  readonly ok: true
  readonly root: string
}

export interface ListOk {
  readonly ok: true
  readonly entries: readonly FsEntry[]
}

export interface ReadOk {
  readonly ok: true
  readonly content: string
}

export interface PathArg {
  readonly path: string
}

export interface WriteArg {
  readonly path: string
  readonly content: string
}

export interface RenameArg {
  readonly from: string
  readonly to: string
}

export interface SetRootArg {
  readonly root: string
}

export function fail(code: FailCode, message: string): FailResult {
  return { ok: false, code, message }
}
