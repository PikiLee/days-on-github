import { put } from '@vercel/blob'

export default async function uploadFile(
  filename: string,
  data: Buffer,
  contentType: string
): ReturnType<typeof put> {
  const blob = await put(filename, data, {
    access: 'public',
    token: process.env.NITRO_BLOB_READ_WRITE_TOKEN,
    contentType,
    cacheControlMaxAge: 60 * 60 * 24 // 1 day
  })
  return blob
}
