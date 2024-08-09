import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <AppHeader />
        <main>{children}</main>
        <AppFooter />
      </body>
    </html>
  )
}
