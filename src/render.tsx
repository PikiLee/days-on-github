import type { AppProps } from './App'
import App from './App'

export async function render(props: AppProps) {
  const html = (await import('react-dom/server')).renderToString(
    <App {...props} />,
  )
  return html
}
