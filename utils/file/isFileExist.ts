import process from 'node:process'
import { list } from '@vercel/blob'

export default async function isFileExist(
  prefix: string,
  filename: string,
): Promise<
  Awaited<ReturnType<typeof list<'expanded'>>>['blobs'][number] | false
  > {
  const { blobs } = await list({
    token: process.env.BLOB_READ_WRITE_TOKEN,
    prefix,
  })
  return blobs.find(blob => blob.pathname === `${prefix}/${filename}`) ?? false
}
