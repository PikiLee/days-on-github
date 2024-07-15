import nodeHtmlToImage from 'node-html-to-image'
import { getDaysOnGithub } from '../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../utils/renderHTML'

export default defineCachedEventHandler(
  async event => {
    const username = getRouterParams(event).username
    console.log('username', username)

    const githubData = await getDaysOnGithub(username)
    if (!githubData) {
      setResponseStatus(event, 404, 'Not Found')
      return 'Not Found'
    }

    const html = await renderHTML(githubData)

    const image = await nodeHtmlToImage({
      html,
      puppeteerArgs: {
        executablePath: '/usr/bin/google-chrome-stable'
      }
    })

    setResponseHeader(event, 'Content-Type', 'image/png')

    return image
  },
  {
    maxAge: 60 * 60 * 24 // 1 day
  }
)
