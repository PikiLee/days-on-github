import { readFile } from 'fs/promises'

import path from 'path'
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

export async function renderHTML(props: AppProps) {
  const template = await readFile(
    path.join(process.cwd(), 'index.html'),
    'utf-8'
  )
  const css = await readFile(
    path.join(process.cwd(), './dist/output.css'),
    'utf-8'
  )
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
