import { describe, it, expect, vi } from 'vitest'
import renderHTML, { GithubData } from '../utils/renderHTML'

vi.mock('fs/promises', async (importOriginal) => {
  // @ts-ignore
  const { readFile } = await importOriginal()
  return {
    readFile: vi.fn((path: string) =>
      Promise.resolve(
        path.endsWith('index.html')
          ? readFile('./index.html', 'utf-8')
          : 'body { background-color: white; }'
      )
    )
  }
})

const mockRenderedContent = '<div>Github Stats</div>'

vi.mock('../dist/server/render.mjs', () => ({
  render: vi.fn(() => Promise.resolve(mockRenderedContent))
}))

describe('renderHTML', () => {
  it('should render HTML with the provided Github data', async () => {
    const githubData: GithubData = {
      daysOnGithub: 100,
      percentageDaysOnGithub: 75
    }

    const result = await renderHTML(githubData)

    expect(result).toMatchInlineSnapshot(`
      "<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Days on Github</title>
          <style>body { background-color: white; }</style>
        </head>
        <body>
          <div id="root"><div>Github Stats</div></div>
          
        </body>
      </html>
      "
    `)
  })
})
