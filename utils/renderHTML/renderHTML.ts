// eslint-disable-next-line antfu/no-import-dist
import { render } from '../../dist/server/render.mjs'
import type { GraphProps } from '~/graph/Graph'

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
  props: GraphProps,
  template: string,
  css: string,
): Promise<string> {
  const rendered = await render(props)

  const html = template
    .replace('<script type="module" src="./src/main.tsx"></script>', '')
    .replace(
      '<link rel="stylesheet" href="./src/index.css" />',
      `<style>${css}</style>`,
    )
    .replace('<!--app-html-->', rendered ?? '')

  return html
}
