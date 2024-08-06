import process from 'node:process'

export const isDev = process.env.NODE_ENV === 'development'

export const isVercelPreview = process.env.VERCEL_ENV === 'preview'
