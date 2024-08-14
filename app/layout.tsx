import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import { NextUIProvider } from '@nextui-org/react'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import AppQueryClientProvider from '~/components/AppQueryClientProvider'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <NextUIProvider>
          <AppQueryClientProvider>
            <AppHeader />
            <main>{children}</main>
            <AppFooter />
          </AppQueryClientProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
