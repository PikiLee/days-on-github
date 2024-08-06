import { describe, expect, it, vi } from 'vitest'
import { list } from '@vercel/blob'
import isFileExist from './isFileExist' // Adjust the path accordingly

// Mock the `head` function from '@vercel/blob'
vi.mock('@vercel/blob', () => ({
  list: vi.fn(),
}))

describe('isFileExist', () => {
  it('should return blob details if the file exists', async () => {
    const mockBlobDetails: Awaited<ReturnType<typeof list<'expanded'>>> = {
      blobs: [
        {
          url: 'url',
          downloadUrl: 'downloadUrl',
          pathname: 'prefix/pathname',
          size: 100,
          uploadedAt: new Date('2023-01-01T00:00:00.000Z'),
        },
      ],
      hasMore: false,
    }
    vi.mocked(list).mockResolvedValueOnce(mockBlobDetails)

    const result = await isFileExist('prefix', 'pathname')
    expect(result).toEqual(mockBlobDetails.blobs[0])
  })

  it('should return false if the file does not exist', async () => {
    const mockBlobDetails: Awaited<ReturnType<typeof list<'expanded'>>> = {
      blobs: [],
      hasMore: false,
    }
    vi.mocked(list).mockResolvedValueOnce(mockBlobDetails)

    const result = await isFileExist('prefix', 'non-existing-pathname')
    expect(result).toBe(false)
  })
})
