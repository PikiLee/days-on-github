import { head } from '@vercel/blob'

export default async function isFileExist(
  filename: string
): Promise<ReturnType<typeof head> | false> {
  try {
    const blobDetails = await head(filename, {
      token: process.env.NITRO_READ_WRITE_TOKEN
    })
    return blobDetails
  } catch (error) {
    console.log(error)
    return false
  }
}
