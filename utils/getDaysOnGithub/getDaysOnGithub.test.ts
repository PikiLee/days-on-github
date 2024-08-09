import process from 'node:process'
import { $fetch } from 'ofetch'
import { describe, expect, it, vi } from 'vitest'

import { mockGithubData, mockGithubResponse } from '../mockData'
import { getDaysOnGithub } from './getDaysOnGithub'

// Mocking the $fetch function
vi.mock('ofetch', () => {
  return {
    $fetch: vi.fn(),
  }
})
vi.mocked($fetch).mockResolvedValue(mockGithubResponse)

describe('getDaysOnGithub', () => {
  it('should fetch GitHub data and return formatted data', async () => {
    vi.stubEnv('GITHUB_CLIENT_TOKEN', 'Token')
    const username = 'testuser'

    const result = await getDaysOnGithub(username)

    expect(result).toEqual(mockGithubData)
  })

  it('should throw an error if GITHUB_CLIENT_TOKEN is missing', async () => {
    delete process.env.GITHUB_CLIENT_TOKEN
    await expect(getDaysOnGithub('testuser')).rejects.toThrow(
      'Missing GITHUB_CLIENT_TOKEN environment variable',
    )
  })

  it('should return null if user is not found', async () => {
    vi.mocked($fetch).mockResolvedValue({
      data: {
        user: null,
      },
    })

    vi.stubEnv('GITHUB_CLIENT_TOKEN', 'Token')

    const result = await getDaysOnGithub('testuser')

    expect(result).toBeNull()
  })
})
