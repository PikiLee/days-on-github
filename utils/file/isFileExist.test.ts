import { describe, it, expect, vi } from 'vitest'
import { head } from '@vercel/blob'
import isFileExist from './isFileExist' // Adjust the path accordingly

// Mock the `head` function from '@vercel/blob'
vi.mock('@vercel/blob', () => ({
  head: vi.fn()
}))

describe('isFileExist', () => {
  it('should return blob details if the file exists', async () => {
    const mockBlobDetails: Awaited<ReturnType<typeof head>> = {
      url: 'url',
      downloadUrl: 'downloadUrl',
      pathname: 'pathname',
      contentType: 'text/plain',
      contentDisposition: 'inline',
      size: 100,
      uploadedAt: new Date('2023-01-01T00:00:00.000Z'),
      cacheControl: 'max-age=0'
    }
    vi.mocked(head).mockResolvedValueOnce(mockBlobDetails)

    const result = await isFileExist('existing-file.txt')
    expect(result).toEqual(mockBlobDetails)
  })

  it('should return false if the file does not exist', async () => {
    vi.mocked(head).mockRejectedValueOnce(new Error('File not found'))

    const result = await isFileExist('non-existing-file.txt')
    expect(result).toBe(false)
  })
})
