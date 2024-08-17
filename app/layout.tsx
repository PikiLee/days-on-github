import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import { NextUIProvider } from '@nextui-org/react'
import type { Metadata } from 'next'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export const metadata: Metadata = {
  title: 'Days on Github',
  description: 'Generate your Github contributions graph with Days on Github. Hand-picked colors and expertly crafted graph, designed for developers.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <NextUIProvider>
          <AppHeader />
          <main>{children}</main>
          <AppFooter />
        </NextUIProvider>
      </body>
    </html>
  )
}
