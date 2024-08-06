import { render } from '../../dist/server/render.mjs'
import { AppProps } from '~/src/App'

export interface GithubData {
  daysOnGithub: number
  percentageDaysOnGithub: number
  contributionDays: {
    date?: string
    contributionCount?: number
  }[]
  name: string
  login: string
  avatarUrl: string | null
}

export async function renderHTML(
  props: AppProps,
  template: string,
  css: string
): Promise<string> {
  const rendered = await render(props)

  const html = template
    .replace('<script type="module" src="./src/main.tsx"></script>', '')
    .replace(
      '<link rel="stylesheet" href="./src/index.css" />',
      `<style>${css}</style>`
    )
    .replace('<!--app-html-->', rendered ?? '')

  return html
}
