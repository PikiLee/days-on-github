import crypto from 'crypto'

export default function hash(username: string): string {
  const hash = crypto.createHash('sha256')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  hash.update(username + today.toISOString())
  const hashedData = hash.digest('hex')

  return hashedData
}
