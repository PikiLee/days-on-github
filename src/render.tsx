import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App'
import { GithubData } from '@/utils/renderHTML'

export function render({ daysOnGithub, percentageDaysOnGithub }: GithubData) {
  const html = renderToString(
    <StrictMode>
      <App
        daysOnGithub={daysOnGithub}
        percentageDaysOnGithub={percentageDaysOnGithub}
      />
    </StrictMode>
  )
  return html
}
