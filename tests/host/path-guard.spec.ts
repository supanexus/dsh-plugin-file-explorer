import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { guardPath, isInsideRoot, normalizeRelativeInput } from '../../src/host/path-guard.ts'

const temps: string[] = []

afterEach(() => {
  for (const dir of temps.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

function scratch(): string {
  const dir = mkdtempSync(join(tmpdir(), 'fe-guard-'))
  temps.push(dir)
  return realpathSync(dir)
}

describe('normalizeRelativeInput', () => {
  it('accepts empty and dotted root', () => {
    expect(normalizeRelativeInput('')).toBe('')
    expect(normalizeRelativeInput('.')).toBe('')
  })

  it('rejects absolute and parent escapes', () => {
    expect(normalizeRelativeInput('/etc/passwd')).toBeNull()
    expect(normalizeRelativeInput('..')).toBeNull()
    expect(normalizeRelativeInput('../secret')).toBeNull()
    expect(normalizeRelativeInput('a/../../b')).toBeNull()
  })

  it('normalizes nested relative paths', () => {
    expect(normalizeRelativeInput('src/./app.ts')).toBe('src/app.ts')
    expect(normalizeRelativeInput('docs/')).toBe('docs')
  })
})

describe('isInsideRoot', () => {
  it('accepts root and descendants', () => {
    const root = scratch()
    expect(isInsideRoot(root, root)).toBe(true)
    expect(isInsideRoot(root, join(root, 'a', 'b'))).toBe(true)
  })

  it('rejects siblings and parents', () => {
    const root = scratch()
    expect(isInsideRoot(root, join(root, '..'))).toBe(false)
    expect(isInsideRoot(root, join(root, '..', 'other'))).toBe(false)
  })
})

describe('guardPath', () => {
  it('resolves a safe relative file', () => {
    const root = scratch()
    mkdirSync(join(root, 'src'))
    writeFileSync(join(root, 'src', 'a.ts'), 'x')
    const result = guardPath(root, 'src/a.ts', (p) => realpathSync(p))
    expect(result).toMatchObject({ ok: true, relative: 'src/a.ts' })
  })

  it('rejects parent traversal', () => {
    const root = scratch()
    expect(guardPath(root, '../outside')).toMatchObject({ ok: false })
  })

  it('rejects symlink escape when realpath is provided', () => {
    const root = scratch()
    const outside = scratch()
    writeFileSync(join(outside, 'secret.txt'), 'nope')
    symlinkSync(outside, join(root, 'link'))
    const result = guardPath(root, 'link/secret.txt', (p) => realpathSync(p))
    expect(result).toMatchObject({ ok: false, reason: 'OUT_OF_ROOT' })
  })
})
