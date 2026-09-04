/**
 * Host Typert service: filesystem operations constrained to a workspace root.
 *
 * Cordis exposes Services through a Proxy; Gateway invokes `@Remote` methods
 * with that Proxy (or a shadow) as `this`. Never touch state on the raw
 * receiver — unwrap via `symbols.original` first (same idea as Gateway's
 * `originalOf`). Do not use JS `#` private fields.
 */

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { spawn } from 'node:child_process'
import { basename, dirname, join } from 'node:path'
import { platform as osPlatform } from 'node:os'
import { symbols, type Context } from '@deepseek-ai/cordis'
import { Remote, TypertRemoteService } from '@deepseek-ai/dsh-typert-protocol'
import {
  EXPLORER_FS_SERVICE,
  fail,
  type FailResult,
  type FsEntry,
  type ListOk,
  type OkResult,
  type ReadOk,
  type RootOk,
} from '../shared/rpc-contract.ts'
import { isEditableText } from './content-type.ts'
import { guardPath } from './path-guard.ts'

const SAMPLE_BYTES = 8192

export type FsOpResult<T> = T | FailResult

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}

/** Unwrap Cordis Proxy / shadow to the real service instance. */
function selfOf(receiver: object): ExplorerFsService {
  const original = Reflect.get(receiver, symbols.original)
  return (isObject(original) ? original : receiver) as ExplorerFsService
}

function guardRel(self: ExplorerFsService, rel: string) {
  return guardPath(self.root, rel, (p) => realpathSync(p))
}

function guardFail(reason: 'OUT_OF_ROOT' | 'INVALID'): FailResult {
  if (reason === 'OUT_OF_ROOT') return fail('OUT_OF_ROOT', 'path escapes workspace root')
  return fail('OUT_OF_ROOT', 'absolute or invalid path rejected')
}

/**
 * Live explorer filesystem RPC. Root can be updated via `setRoot` or settings.
 */
export class ExplorerFsService extends TypertRemoteService {
  /** Absolute workspace root (public: Cordis Proxy must read/write freely). */
  root: string
  /** Whether the current root was pinned from a session cwd. */
  pinned = false

  constructor(ctx: Context, initialRoot: string) {
    super(ctx, EXPLORER_FS_SERVICE)
    this.root = initialRoot
  }

  /** Absolute root currently in effect. */
  getRootPath(): string {
    return this.root
  }

  /** Whether the current root was pinned from a session cwd. */
  isPinned(): boolean {
    return this.pinned
  }

  /**
   * Apply a settings-driven root only when not session-pinned.
   */
  applySettingsRoot(root: string): void {
    if (this.pinned) return
    if (root.trim() === '') return
    this.root = root
  }

  /** Clear pin and fall back to the given settings root. */
  clearPin(fallbackRoot: string): void {
    this.pinned = false
    if (fallbackRoot.trim() !== '') this.root = fallbackRoot
  }

  @Remote
  async getRoot(): Promise<RootOk> {
    const self = selfOf(this)
    return { ok: true, root: self.root }
  }

  @Remote
  async setRoot(root: string): Promise<FsOpResult<RootOk>> {
    const self = selfOf(this)
    const next = root.trim()
    if (next === '') return fail('IO', 'root must be a non-empty absolute directory')
    try {
      const st = statSync(next)
      if (!st.isDirectory()) return fail('IO', 'root is not a directory')
      self.root = realpathSync(next)
      self.pinned = true
      return { ok: true, root: self.root }
    } catch (error) {
      return fail('IO', error instanceof Error ? error.message : 'cannot set root')
    }
  }

  @Remote
  async list(path: string): Promise<FsOpResult<ListOk>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    try {
      const st = statSync(guarded.absolute)
      if (!st.isDirectory()) return fail('IO', 'not a directory')
      const names = readdirSync(guarded.absolute)
      const entries: FsEntry[] = []
      for (const name of names) {
        if (name === '.DS_Store') continue
        const childAbs = join(guarded.absolute, name)
        const childRel = guarded.relative === '' ? name : `${guarded.relative}/${name}`
        try {
          const childSt = statSync(childAbs)
          entries.push({
            name,
            path: childRel.replaceAll('\\', '/'),
            kind: childSt.isDirectory() ? 'dir' : 'file',
            ...(childSt.isFile() ? { size: childSt.size } : {}),
          })
        } catch {
          // skip unreadable entries
        }
      }
      entries.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'dir' ? -1 : 1
        return a.name.localeCompare(b.name)
      })
      return { ok: true, entries }
    } catch (error) {
      if (isNotFound(error)) return fail('NOT_FOUND', 'path not found')
      return fail('IO', error instanceof Error ? error.message : 'list failed')
    }
  }

  @Remote
  async read(path: string): Promise<FsOpResult<ReadOk>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    try {
      const st = statSync(guarded.absolute)
      if (st.isDirectory()) return fail('IS_DIR', 'path is a directory')
      const buf = readFileSync(guarded.absolute)
      const sample = buf.subarray(0, SAMPLE_BYTES)
      if (!isEditableText(guarded.absolute, sample)) {
        return fail('IS_BINARY', 'file looks binary and cannot be edited')
      }
      return { ok: true, content: buf.toString('utf8') }
    } catch (error) {
      if (isNotFound(error)) return fail('NOT_FOUND', 'path not found')
      return fail('IO', error instanceof Error ? error.message : 'read failed')
    }
  }

  @Remote
  async write(path: string, content: string): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    try {
      try {
        const st = statSync(guarded.absolute)
        if (st.isDirectory()) return fail('IS_DIR', 'path is a directory')
      } catch (error) {
        if (!isNotFound(error)) {
          return fail('IO', error instanceof Error ? error.message : 'stat failed')
        }
      }
      writeFileSync(guarded.absolute, content, 'utf8')
      return { ok: true }
    } catch (error) {
      return fail('IO', error instanceof Error ? error.message : 'write failed')
    }
  }

  @Remote
  async mkdir(path: string): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    try {
      if (exists(guarded.absolute)) return fail('EXISTS', 'path already exists')
      mkdirSync(guarded.absolute, { recursive: false })
      return { ok: true }
    } catch (error) {
      if (isExists(error)) return fail('EXISTS', 'path already exists')
      return fail('IO', error instanceof Error ? error.message : 'mkdir failed')
    }
  }

  @Remote
  async rename(from: string, to: string): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    const fromG = guardRel(self, from)
    if (!fromG.ok) return guardFail(fromG.reason)
    const toG = guardRel(self, to)
    if (!toG.ok) return guardFail(toG.reason)
    try {
      if (!exists(fromG.absolute)) return fail('NOT_FOUND', 'source not found')
      if (exists(toG.absolute)) return fail('EXISTS', 'destination already exists')
      renameSync(fromG.absolute, toG.absolute)
      return { ok: true }
    } catch (error) {
      if (isNotFound(error)) return fail('NOT_FOUND', 'source not found')
      return fail('IO', error instanceof Error ? error.message : 'rename failed')
    }
  }

  /** Named `unlink` — Client remote forbids `remove` (Cordis Service.prototype). */
  @Remote
  async unlink(path: string): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    if (guarded.relative === '') return fail('IO', 'cannot remove workspace root')
    try {
      const st = statSync(guarded.absolute)
      if (st.isDirectory()) {
        const children = readdirSync(guarded.absolute)
        if (children.length > 0) return fail('NOT_EMPTY', 'directory is not empty')
        rmdirSync(guarded.absolute)
      } else {
        unlinkSync(guarded.absolute)
      }
      return { ok: true }
    } catch (error) {
      if (isNotFound(error)) return fail('NOT_FOUND', 'path not found')
      return fail('IO', error instanceof Error ? error.message : 'unlink failed')
    }
  }

  /** Open the workspace root in the OS file manager (Finder / Explorer / xdg-open). */
  @Remote
  async revealRoot(): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    try {
      await openInFileManager(self.root)
      return { ok: true }
    } catch (error) {
      return fail('IO', error instanceof Error ? error.message : 'cannot open file manager')
    }
  }

  /**
   * Open a workspace-relative path in the OS file manager.
   * Directories open as folders; files reveal their parent directory.
   */
  @Remote
  async revealPath(path: string): Promise<FsOpResult<OkResult>> {
    const self = selfOf(this)
    const guarded = guardRel(self, path)
    if (!guarded.ok) return guardFail(guarded.reason)
    try {
      const st = statSync(guarded.absolute)
      const target = st.isDirectory()
        ? guarded.absolute
        : (dirname(guarded.absolute) || guarded.absolute)
      await openInFileManager(target)
      return { ok: true }
    } catch (error) {
      if (isNotFound(error)) return fail('NOT_FOUND', 'path not found')
      return fail('IO', error instanceof Error ? error.message : 'cannot open file manager')
    }
  }
}

function openInFileManager(absolute: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const platform = osPlatform()
    let child
    if (platform === 'darwin') {
      child = spawn('open', [absolute], { stdio: 'ignore', detached: true })
    } else if (platform === 'win32') {
      child = spawn('explorer', [absolute], { stdio: 'ignore', detached: true })
    } else {
      child = spawn('xdg-open', [absolute], { stdio: 'ignore', detached: true })
    }
    child.on('error', reject)
    child.unref()
    // Do not wait for the GUI app to exit — spawn success is enough.
    resolve()
  })
}

function exists(absolute: string): boolean {
  try {
    statSync(absolute)
    return true
  } catch {
    return false
  }
}

function isNotFound(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error
    && (error as { code: string }).code === 'ENOENT'
}

function isExists(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error
    && (error as { code: string }).code === 'EEXIST'
}

/** Basename helper for rename UI. */
export function entryBasename(relPath: string): string {
  return basename(relPath)
}

/** Parent relative path of a relative file path. */
export function entryParent(relPath: string): string {
  const parent = dirname(relPath).replaceAll('\\', '/')
  return parent === '.' ? '' : parent
}
