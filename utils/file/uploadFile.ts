import process from 'node:process'
import type { Buffer } from 'node:buffer'
import { put } from '@vercel/blob'

export default async function uploadFile(
  filename: string,
  data: Buffer,
  contentType: string,
): Promise<ReturnType<typeof put>> {
  const blob = await put(filename, data, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
    contentType,
    cacheControlMaxAge: 60 * 60 * 24, // 1 day
  })
  return blob
}
