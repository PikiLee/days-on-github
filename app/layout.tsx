import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import { NextUIProvider } from '@nextui-org/react'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

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
