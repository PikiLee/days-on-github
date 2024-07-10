import { $fetch } from 'ofetch'
import { describe, it, expect, vi } from 'vitest'
import { getDaysOnGithub } from './getDaysOnGithub'
import { mockGithubResponse } from '../mockData'

// Mocking the $fetch function
vi.mock('ofetch', () => {
  return {
    $fetch: vi.fn()
  }
})
vi.mocked($fetch).mockResolvedValue(mockGithubResponse)

describe('getDaysOnGithub', () => {
  it('should fetch GitHub data and return formatted data', async () => {
    vi.stubEnv('GITHUB_CLIENT_TOKEN', 'Token')
    const username = 'testuser'

    const result = await getDaysOnGithub(username)

    expect(result).toMatchFileSnapshot('./getDaysOnGithub.snapshot')
  })

  it('should throw an error if GITHUB_CLIENT_TOKEN is missing', async () => {
    delete process.env.GITHUB_CLIENT_TOKEN
    await expect(getDaysOnGithub('testuser')).rejects.toThrow(
      'Missing GITHUB_CLIENT_TOKEN environment variable'
    )
  })
})
