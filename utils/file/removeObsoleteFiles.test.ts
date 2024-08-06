import { describe, it, expect, vi, beforeEach } from 'vitest'
import { list } from '@vercel/blob'
import removeObsoleteFiles from './removeObsoleteFiles'

// Mock the dependencies
vi.mock('@vercel/blob', () => ({
  del: vi.fn(),
  list: vi.fn()
}))

describe('removeObsoleteFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should remove obsolete files', async () => {
    const mockBlobs: Awaited<ReturnType<typeof list<'expanded'>>>['blobs'] = [
      {
        url: 'file1',
        downloadUrl: 'downloadUrl',
        pathname: 'prefix/pathname',
        size: 100,
        uploadedAt: new Date(Date.now() - 86400000)
      }, // yesterday
      {
        url: 'file2',
        downloadUrl: 'downloadUrl',
        pathname: 'prefix/pathname',
        size: 100,
        uploadedAt: new Date()
      } // today
    ]

    vi.mocked(list).mockResolvedValueOnce({
      blobs: mockBlobs,
      cursor: null,
      hasMore: false
    })

    const { removedFiles } = await removeObsoleteFiles()

    expect(removedFiles).toBe(1)
  })

  it('should handle errors gracefully', async () => {
    vi.mocked(list).mockRejectedValueOnce(new Error('Failed to list files'))

    await expect(removeObsoleteFiles()).rejects.toThrow(
      'Error removing obsolete files'
    )
  })
})
