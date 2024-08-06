import crypto from 'crypto'

export default function hash(username: string): string {
  const hash = crypto.createHash('sha256')
  hash.update(username + new Date().toISOString())
  const hashedData = hash.digest('hex')

  return hashedData
}
