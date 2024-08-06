import { describe, it, expect, vi } from 'vitest'
import { put } from '@vercel/blob'
import uploadFile from './uploadFile' // Adjust the path accordingly

// Mock the `put` function from '@vercel/blob'
vi.mock('@vercel/blob', () => ({
  put: vi.fn()
}))

describe('uploadFile', () => {
  it('should upload the file and return blob details', async () => {
    const mockBlobDetails: Awaited<ReturnType<typeof put>> = {
      url: 'url',
      downloadUrl: 'downloadUrl',
      pathname: 'pathname',
      contentType: 'text/plain',
      contentDisposition: 'inline'
    }
    vi.mocked(put).mockResolvedValueOnce(mockBlobDetails)

    const filename = 'file.txt'
    const data = Buffer.from('file content')
    const contentType = 'text/plain'

    const result = await uploadFile(filename, data, contentType)
    expect(result).toEqual(mockBlobDetails)
  })
})
