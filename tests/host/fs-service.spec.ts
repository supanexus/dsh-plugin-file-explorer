import {
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { Context } from '@deepseek-ai/cordis'
import { ExplorerFsService } from '../../src/host/fs-service.ts'

const temps: string[] = []

afterEach(() => {
  for (const dir of temps.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

function scratch(): string {
  const dir = mkdtempSync(join(tmpdir(), 'fe-fs-'))
  temps.push(dir)
  return realpathSync(dir)
}

async function withService<T>(
  root: string,
  run: (svc: ExplorerFsService) => Promise<T>,
): Promise<T> {
  const ctx = new Context()
  const svc = new ExplorerFsService(ctx, root)
  return await run(svc)
}

describe('ExplorerFsService', () => {
  it('lists directories before files', async () => {
    const root = scratch()
    mkdirSync(join(root, 'b-dir'))
    writeFileSync(join(root, 'a.txt'), 'hi')
    await withService(root, async (svc) => {
      const result = await svc.list('')
      expect(result.ok).toBe(true)
      if (!result.ok) return
      expect(result.entries.map((e) => e.name)).toEqual(['b-dir', 'a.txt'])
    })
  })

  it('reads and writes text files', async () => {
    const root = scratch()
    writeFileSync(join(root, 'note.md'), 'one')
    await withService(root, async (svc) => {
      const read = await svc.read('note.md')
      expect(read).toEqual({ ok: true, content: 'one' })
      const wrote = await svc.write('note.md', 'two')
      expect(wrote).toEqual({ ok: true })
      const again = await svc.read('note.md')
      expect(again).toEqual({ ok: true, content: 'two' })
    })
  })

  it('rejects binary reads', async () => {
    const root = scratch()
    writeFileSync(join(root, 'blob.bin'), Buffer.from([0, 1, 2, 3]))
    await withService(root, async (svc) => {
      const result = await svc.read('blob.bin')
      expect(result).toMatchObject({ ok: false, code: 'IS_BINARY' })
    })
  })

  it('refuses non-empty directory removal', async () => {
    const root = scratch()
    mkdirSync(join(root, 'keep'))
    writeFileSync(join(root, 'keep', 'x.txt'), 'x')
    await withService(root, async (svc) => {
      const result = await svc.unlink('keep')
      expect(result).toMatchObject({ ok: false, code: 'NOT_EMPTY' })
    })
  })

  it('removes empty directories and files', async () => {
    const root = scratch()
    mkdirSync(join(root, 'empty'))
    writeFileSync(join(root, 'gone.txt'), 'x')
    await withService(root, async (svc) => {
      expect(await svc.unlink('empty')).toEqual({ ok: true })
      expect(await svc.unlink('gone.txt')).toEqual({ ok: true })
    })
  })

  it('rejects rename onto an existing path', async () => {
    const root = scratch()
    writeFileSync(join(root, 'a.txt'), 'a')
    writeFileSync(join(root, 'b.txt'), 'b')
    await withService(root, async (svc) => {
      const result = await svc.rename('a.txt', 'b.txt')
      expect(result).toMatchObject({ ok: false, code: 'EXISTS' })
    })
  })

  it('rejects path escape', async () => {
    const root = scratch()
    await withService(root, async (svc) => {
      const result = await svc.read('../outside.txt')
      expect(result).toMatchObject({ ok: false, code: 'OUT_OF_ROOT' })
    })
  })

  it('rejects revealPath outside root', async () => {
    const root = scratch()
    await withService(root, async (svc) => {
      const result = await svc.revealPath('../outside')
      expect(result).toMatchObject({ ok: false, code: 'OUT_OF_ROOT' })
    })
  })

  it('rejects revealPath for missing entries', async () => {
    const root = scratch()
    await withService(root, async (svc) => {
      const result = await svc.revealPath('missing-dir')
      expect(result).toMatchObject({ ok: false, code: 'NOT_FOUND' })
    })
  })
})
