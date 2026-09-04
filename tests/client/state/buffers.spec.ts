import { describe, expect, it } from 'vitest'
import { BuffersStore } from '../../../src/client/state/buffers.ts'

describe('BuffersStore', () => {
  it('tracks dirty lifecycle across edit and save', () => {
    const store = new BuffersStore()
    store.load('a.ts', 'hello')
    expect(store.isDirty('a.ts')).toBe(false)
    store.setContent('a.ts', 'hello!')
    expect(store.isDirty('a.ts')).toBe(true)
    store.markSaved('a.ts')
    expect(store.isDirty('a.ts')).toBe(false)
    expect(store.get('a.ts')?.content).toBe('hello!')
  })

  it('drops and renames buffers', () => {
    const store = new BuffersStore()
    store.load('old.ts', 'x')
    store.setContent('old.ts', 'y')
    store.rename('old.ts', 'new.ts')
    expect(store.get('old.ts')).toBeUndefined()
    expect(store.isDirty('new.ts')).toBe(true)
    store.drop('new.ts')
    expect(store.get('new.ts')).toBeUndefined()
  })
})
