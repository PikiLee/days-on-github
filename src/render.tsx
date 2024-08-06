import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import type { AppProps } from './App'
import App from './App'

export function render(props: AppProps) {
  const html = renderToString(
    <StrictMode>
      <App {...props} />
    </StrictMode>,
  )
  return html
}
