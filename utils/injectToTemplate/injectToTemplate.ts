// eslint-disable-next-line antfu/no-import-dist
import { renderGraphToHTML } from '../../dist/renderGraphToHTML.mjs'
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
  const rendered = await renderGraphToHTML(props)

  const html = template
    .replace('<script type="module" src="./src/main.tsx"></script>', '')
    .replace(
      '<link rel="stylesheet" href="./src/index.css" />',
      `<style>${css}</style>`,
    )
    .replace('<!--app-html-->', rendered ?? '')

  return html
}
