import { describe, it, expect, vi } from 'vitest'
import hash from './hash'

describe('hash function', () => {
  it('should return a hashed string', () => {
    // Mock the date to ensure consistent hash output
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 0, 1))

    const string1 = 'testuser'
    const string2 = 'password'
    const hashedValue = hash(string1, string2)

    expect(hashedValue).toMatchInlineSnapshot(
      `"77244f0d13646b0d2698b007dcbd3e4ef7aab4454e7a3c4feb77a850dd273e4a"`
    )
  })
})
