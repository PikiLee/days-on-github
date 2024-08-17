import type { Metadata } from 'next'
import APIDoc from '~/components/APIDoc'

export const metadata: Metadata = {
  title: 'API Docs',
  description: 'Embed your Github contribution graph anywhere using our free and easy-to-use API endpoint.',
}

export default function Page() {
  return (
    <APIDoc />
  )
}
