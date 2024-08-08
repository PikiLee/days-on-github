import { Analytics } from '@vercel/analytics/react'
import '../src/index.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Analytics />
        <main>{children}</main>
      </body>
    </html>
  )
}
