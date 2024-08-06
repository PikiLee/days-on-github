import process from 'node:process'
import { del, list } from '@vercel/blob'
import { logger } from '../logger'

export default async function removeObsoleteFiles(): Promise<{
  removedFiles: number
}> {
  try {
    const files = []
    let hasMore = false
    let cursor
    do {
      const {
        blobs,
        cursor: nextCursor,
        hasMore: nextHasMore,
      } = await list({
        token: process.env.NITRO_BLOB_READ_WRITE_TOKEN,
        cursor,
      })
      hasMore = nextHasMore
      cursor = nextCursor
      for (const blob of blobs) {
        const today = new Date()
        today.setUTCHours(0, 0, 0, 0)

        if (new Date(blob.uploadedAt) < today) {
          files.push(blob)
        }
      }
    } while (hasMore)
    logger.info(`Found ${files.length} files to remove`)
    logger.debug(files)

    await Promise.all(
      files.map(file =>
        del(file.url, {
          token: process.env.NITRO_BLOB_READ_WRITE_TOKEN,
        }),
      ),
    )

    return {
      removedFiles: files.length,
    }
  }
  catch (error) {
    logger.error('Error removing obsolete files', error)
    throw new Error('Error removing obsolete files')
  }
}
