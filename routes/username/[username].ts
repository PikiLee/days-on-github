import sharp from 'sharp'
import { z } from 'zod'
import { launch } from 'puppeteer'
import { getDaysOnGithub as uncachedGetDaysOnGithub } from '../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../utils/renderHTML'
import { Include, tailwindColors } from '~/src/App'
import { logger } from '~/utils/logger'

const getDaysOnGithub = cachedFunction(uncachedGetDaysOnGithub, {
  maxAge: 60 * 60 * 24 // 1 day
})

export default defineEventHandler(async event => {
  try {
    const username = getRouterParams(event).username
    logger.info({ username })

    const query = await getValidatedQuery(event, data =>
      z
        .object({
          tone: z.enum(tailwindColors).optional(),
          include: z
            .string()
            .optional()
            .transform(v => (v ? (v.split(',') as Include[]) : undefined))
        })
        .parse(data)
    )
    logger.info({ query })

    const githubData = await getDaysOnGithub(username)
    logger.debug(
      Object.assign({}, githubData, { contributionDays: 'Too long to show' })
    )
    if (!githubData) {
      setResponseStatus(event, 404, 'Not Found')
      return 'Not Found'
    }

    const html = await renderHTML({ githubData, ...query })

    const puppeteerArgs = isDev
      ? {}
      : { executablePath: '/usr/bin/google-chrome-stable' }
    const browser = await launch(puppeteerArgs)
    const page = await browser.newPage()
    await page.setContent(html)
    const bodyEl = await page.$('body')
    const originalImage = await bodyEl.screenshot({
      type: 'png',
      omitBackground: true
    })

    const compressedImage = await sharp(
      Array.isArray(originalImage) ? originalImage[0] : originalImage
    )
      .png({ compressionLevel: 9 })
      .toBuffer()

    setResponseHeader(event, 'Content-Type', 'image/png')

    return compressedImage
  } catch (error) {
    logger.error(error)
    throw error
  }
})
