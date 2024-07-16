import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App, { AppProps } from './App'

export function render(props: AppProps) {
  const html = renderToString(
    <StrictMode>
      <App {...props} />
    </StrictMode>
  )
  return html
}
