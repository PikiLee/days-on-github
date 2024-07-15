import nodeHtmlToImage from 'node-html-to-image'
import { getDaysOnGithub as uncachedGetDaysOnGithub } from '../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../utils/renderHTML'
import sharp from 'sharp'

const getDaysOnGithub = cachedFunction(uncachedGetDaysOnGithub, {
  maxAge: 60 * 60 * 24 // 1 day
})

export default defineEventHandler(
  async event => {
    const username = getRouterParams(event).username
    console.log('username', username)

    const githubData = await getDaysOnGithub(username)
    if (!githubData) {
      setResponseStatus(event, 404, 'Not Found')
      return 'Not Found'
    }

    const html = await renderHTML(githubData)

    const _image = await nodeHtmlToImage({
      html,
      puppeteerArgs: {
        executablePath: '/usr/bin/google-chrome-stable'
      },
    })

    const image =  sharp(Array.isArray(_image) ? _image[0] : _image).png({compressionLevel: 9})

    setResponseHeader(event, 'Content-Type', 'image/png')

    return image
  }
)
