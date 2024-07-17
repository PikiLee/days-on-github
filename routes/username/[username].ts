import nodeHtmlToImage from 'node-html-to-image'
import sharp from 'sharp'
import { z } from 'zod'
import { getDaysOnGithub as uncachedGetDaysOnGithub } from '../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../utils/renderHTML'
import { Include, tailwindColors } from '~/src/App'

const getDaysOnGithub = cachedFunction(uncachedGetDaysOnGithub, {
  maxAge: 60 * 60 * 24 // 1 day
})

export default defineEventHandler(async event => {
  const username = getRouterParams(event).username
  console.log('username', username)

  const query = await getValidatedQuery(event, data =>
    z
      .object({
        tone: z.enum(tailwindColors).optional(),
        include: z
          .string()
          .optional()
          .transform(v => v.split(',') as Include[])
      })
      .parse(data)
  )
  console.log(query)

  const githubData = await getDaysOnGithub(username)
  if (!githubData) {
    setResponseStatus(event, 404, 'Not Found')
    return 'Not Found'
  }

  const html = await renderHTML({ githubData, ...query })

  const nodeHTMLToImageProp: Parameters<typeof nodeHtmlToImage>[0] = {
    html,
    transparent: true
  }
  if (process.env.NODE_ENV === 'production') {
    nodeHTMLToImageProp.puppeteerArgs = {
      executablePath: '/usr/bin/google-chrome-stable'
    }
  }

  const _image = await nodeHtmlToImage(nodeHTMLToImageProp)

  const image = await sharp(Array.isArray(_image) ? _image[0] : _image)
    .png({ compressionLevel: 9 })
    .toBuffer()

  setResponseHeader(event, 'Content-Type', 'image/png')

  return image
})
