import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import AppHeader from '~/components/AppHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
