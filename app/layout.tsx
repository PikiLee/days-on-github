import { Analytics } from '@vercel/analytics/react'

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
