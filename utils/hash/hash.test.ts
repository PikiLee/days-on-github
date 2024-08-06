import { describe, expect, it, vi } from 'vitest'
import hash from './hash'

describe('hash function', () => {
  it('should return a hashed string', () => {
    // Mock the date to ensure consistent hash output
    vi.useFakeTimers()
    vi.setSystemTime(Date.UTC(2023, 0, 1))

    const string1 = 'testuser'
    const string2 = 'password'
    const hashedValue = hash(string1, string2)

    expect(hashedValue).toMatchInlineSnapshot(
      `"6986d112166a3a55730fef9ffa6222ca838aa4579bacf49c714e4d608ad4b2d9"`,
    )
  })
})
