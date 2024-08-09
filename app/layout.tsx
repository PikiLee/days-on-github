import { Analytics } from '@vercel/analytics/react'
import '../index.css'
import Header from '~/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
