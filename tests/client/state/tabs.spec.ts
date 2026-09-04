import { describe, expect, it } from 'vitest'
import { TabsStore } from '../../../src/client/state/tabs.ts'

describe('TabsStore', () => {
  it('dedupes open and activates existing', () => {
    const store = new TabsStore()
    expect(store.open('a.ts')).toBe(true)
    expect(store.open('a.ts')).toBe(false)
    expect(store.getSnapshot().open).toHaveLength(1)
    expect(store.getSnapshot().activePath).toBe('a.ts')
  })

  it('closes active tab by preferring the right neighbor', () => {
    const store = new TabsStore()
    store.open('a.ts')
    store.open('b.ts')
    store.open('c.ts')
    store.activate('b.ts')
    store.close('b.ts')
    expect(store.getSnapshot().open.map((t) => t.path)).toEqual(['a.ts', 'c.ts'])
    expect(store.getSnapshot().activePath).toBe('c.ts')
  })

  it('falls back to the left neighbor when closing the last tab', () => {
    const store = new TabsStore()
    store.open('a.ts')
    store.open('b.ts')
    store.close('b.ts')
    expect(store.getSnapshot().activePath).toBe('a.ts')
    store.close('a.ts')
    expect(store.getSnapshot().activePath).toBeNull()
    expect(store.getSnapshot().open).toEqual([])
  })

  it('renames an open tab path', () => {
    const store = new TabsStore()
    store.open('old.ts')
    store.rename('old.ts', 'new.ts')
    expect(store.getSnapshot()).toEqual({
      open: [{ path: 'new.ts', title: 'new.ts' }],
      activePath: 'new.ts',
    })
  })

  it('caches getSnapshot until a mutation', () => {
    const store = new TabsStore()
    const a = store.getSnapshot()
    const b = store.getSnapshot()
    expect(a).toBe(b)
    store.open('a.ts')
    const c = store.getSnapshot()
    expect(c).not.toBe(a)
    expect(store.getSnapshot()).toBe(c)
  })
})
