import { describe, expect, it, vi } from 'vitest'

import { mockGithubData } from '../mockData'
import { renderHTML } from './renderHTML'

vi.mock('fs/promises')
const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Days on Github</title>
    <link rel="stylesheet" href="./src/index.css" />
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="./src/main.tsx"></script>
  </body>
</html>
`

const css = 'body { background-color: white; }'

const mockRenderedContent = '<div>Github Stats</div>'
vi.mock('../../dist/server/render.mjs', () => ({
  render: vi.fn(() => mockRenderedContent),
}))

describe('renderHTML', () => {
  it('should render HTML with the provided Github data', async () => {
    const result = await renderHTML({ githubData: mockGithubData }, template, css)

    expect(result).toMatchSnapshot()
  })
})
