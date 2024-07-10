import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App'
import { GithubData } from '@/utils/renderHTML'

export function render(githubData: GithubData) {
  const html = renderToString(
    <StrictMode>
      <App githubData={githubData} />
    </StrictMode>
  )
  return html
}
