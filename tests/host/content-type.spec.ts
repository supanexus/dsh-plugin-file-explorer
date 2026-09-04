import { describe, expect, it } from 'vitest'
import {
  bufferLooksBinary,
  isEditableText,
  isLikelyTextPath,
} from '../../src/host/content-type.ts'

describe('isLikelyTextPath', () => {
  it('recognizes common source extensions', () => {
    expect(isLikelyTextPath('src/app.ts')).toBe(true)
    expect(isLikelyTextPath('README.md')).toBe(true)
    expect(isLikelyTextPath('style.css')).toBe(true)
  })

  it('treats unknown binaries by extension as non-text hint', () => {
    expect(isLikelyTextPath('photo.png')).toBe(false)
    expect(isLikelyTextPath('blob.bin')).toBe(false)
  })
})

describe('bufferLooksBinary', () => {
  it('flags NUL bytes', () => {
    expect(bufferLooksBinary(Uint8Array.of(65, 0, 66))).toBe(true)
    expect(bufferLooksBinary(Uint8Array.from([65, 66, 67]))).toBe(false)
  })
})

describe('isEditableText', () => {
  it('allows known text even with high-bit utf8', () => {
    const sample = new TextEncoder().encode('你好')
    expect(isEditableText('note.md', sample)).toBe(true)
  })

  it('rejects buffers with NUL', () => {
    expect(isEditableText('note.md', Uint8Array.of(1, 0, 2))).toBe(false)
  })
})
