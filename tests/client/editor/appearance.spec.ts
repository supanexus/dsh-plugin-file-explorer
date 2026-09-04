import { describe, expect, it } from 'vitest'
import { EditorAppearanceStore, normalizeHexColor } from '../../../src/client/editor/appearance.ts'

describe('normalizeHexColor', () => {
  it('accepts 3/6/8 digit hex', () => {
    expect(normalizeHexColor('#abc')).toBe('#aabbcc')
    expect(normalizeHexColor('#1E1E1E')).toBe('#1e1e1e')
    expect(normalizeHexColor('#11223344')).toBe('#11223344')
  })

  it('rejects invalid values', () => {
    expect(normalizeHexColor('1e1e1e')).toBeNull()
    expect(normalizeHexColor('#gg0000')).toBeNull()
    expect(normalizeHexColor('#12')).toBeNull()
    expect(normalizeHexColor('')).toBeNull()
  })
})

describe('EditorAppearanceStore schemes', () => {
  it('saves color + font and applies / removes', () => {
    const store = new EditorAppearanceStore()
    store.setCustomBackground('#224466')
    store.setFontSize(16)
    expect(store.saveScheme()).toBe(true)
    expect(store.getSnapshot().schemes).toHaveLength(1)
    expect(store.getSnapshot().schemes[0]).toMatchObject({
      background: '#224466',
      fontSize: 16,
    })

    store.setCustomBackground('#abcdef')
    store.setFontSize(12)
    const id = store.getSnapshot().schemes[0]!.id
    expect(store.applyScheme(id)).toBe(true)
    expect(store.getSnapshot().customBackground).toBe('#224466')
    expect(store.getSnapshot().fontSize).toBe(16)

    store.removeScheme(id)
    expect(store.getSnapshot().schemes).toEqual([])
  })

  it('dedupes identical schemes by moving them to front', () => {
    const store = new EditorAppearanceStore()
    store.setCustomBackground('#111111')
    store.setFontSize(14)
    store.saveScheme()
    store.setCustomBackground('#222222')
    store.setFontSize(15)
    store.saveScheme()
    store.setCustomBackground('#111111')
    store.setFontSize(14)
    store.saveScheme()
    expect(store.getSnapshot().schemes).toHaveLength(2)
    expect(store.getSnapshot().schemes[0]).toMatchObject({
      background: '#111111',
      fontSize: 14,
    })
  })
})
