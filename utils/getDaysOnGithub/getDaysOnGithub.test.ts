import { $fetch } from 'ofetch'
import { describe, it, expect, vi } from 'vitest'
import { mockGithubResponse } from '../mockData'
import { getDaysOnGithub } from './getDaysOnGithub'

// Mocking the $fetch function
vi.mock('ofetch', () => {
  return {
    $fetch: vi.fn()
  }
})
vi.mocked($fetch).mockResolvedValue(mockGithubResponse)

describe('getDaysOnGithub', () => {
  it('should fetch GitHub data and return formatted data', async () => {
    vi.stubEnv('NITRO_GITHUB_CLIENT_TOKEN', 'Token')
    const username = 'testuser'

    const result = await getDaysOnGithub(username)

    expect(result).toMatchFileSnapshot('./getDaysOnGithub.snapshot')
  })

  it('should throw an error if NITRO_GITHUB_CLIENT_TOKEN is missing', async () => {
    delete process.env.NITRO_GITHUB_CLIENT_TOKEN
    await expect(getDaysOnGithub('testuser')).rejects.toThrow(
      'Missing NITRO_GITHUB_CLIENT_TOKEN environment variable'
    )
  })
})
