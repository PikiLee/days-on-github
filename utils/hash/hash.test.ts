import { describe, it, expect, vi } from 'vitest'
import hash from './hash'

describe('hash function', () => {
  it('should return a hashed string', () => {
    // Mock the date to ensure consistent hash output
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2023, 0, 1))

    const username = 'testuser'
    const hashedValue = hash(username)

    expect(hashedValue).toMatchInlineSnapshot(
      `"7541c75c7dd9385ec66491543103a43bd13260ef002725b9d12a0e584545a955"`
    )
  })
})
