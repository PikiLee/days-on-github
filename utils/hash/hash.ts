import crypto from 'node:crypto'

export default function hash(...stringArray: string[]): string {
  const hash = crypto.createHash('sha256')
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  hash.update(stringArray.join() + today.toISOString())
  const hashedData = hash.digest('hex')

  return hashedData
}
