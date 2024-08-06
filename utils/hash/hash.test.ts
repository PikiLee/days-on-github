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
      `"ee0d9cbd44cd42abb5956159b4647ff1565422d27bd97affa89f2dc89c47ec47"`
    )
  })
})
