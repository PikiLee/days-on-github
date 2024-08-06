import sharp from 'sharp'
import { z } from 'zod'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
import { getDaysOnGithub as uncachedGetDaysOnGithub } from '../../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../../utils/renderHTML'
// @ts-ignore
import template from '../../../index.html'
// @ts-ignore
import css from '../../../dist/output.css'
import { Include, tailwindColors } from '~/src/App'
import { logger } from '~/utils/logger'
import hash from '~/utils/hash/hash'
import isFileExist from '~/utils/file/isFileExist'
import uploadFile from '~/utils/file/uploadFile'

const getDaysOnGithub = cachedFunction(uncachedGetDaysOnGithub, {
  maxAge: 60 * 60 * 24 // 1 day
})

const localExecutablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const remoteExecutablePath =
  'https://github.com/Sparticuz/chromium/releases/download/v126.0.0/chromium-v126.0.0-pack.tar'

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

    const filename = hash(JSON.stringify(query))
    logger.debug({ filename })
    const existedFileDetails = await isFileExist(username, filename)

    const contentType = 'image/png'
    setResponseHeader(event, 'Content-Type', contentType)
    if (existedFileDetails) {
      logger.info('file exists in storage')
      logger.debug('existedFileDetails', existedFileDetails)
      return sendRedirect(event, existedFileDetails.url)
    } else {
      logger.info('file does not exist in storage')
      const githubData = await getDaysOnGithub(username)
      logger.debug(
        Object.assign({}, githubData, { contributionDays: 'Too long to show' })
      )
      if (!githubData) {
        setResponseStatus(event, 404, 'Not Found')
        return 'Not Found'
      }

      const html = await renderHTML({ githubData, ...query }, template, css)

      const browser = await puppeteer.launch({
        args: isDev ? [] : chromium.args,
        executablePath: isDev
          ? localExecutablePath
          : await chromium.executablePath(remoteExecutablePath),
        headless: chromium.headless
      })
      const page = await browser.newPage()

      // Set a larger viewport and higher device scale factor
      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2 // Increase for higher pixel density
      })

      await page.setContent(html)
      const bodyEl = await page.$('body')
      const originalImage = await bodyEl.screenshot({
        type: 'png',
        omitBackground: true
      })
      browser.close()

      const compressedImage = await sharp(
        Array.isArray(originalImage) ? originalImage[0] : originalImage
      )
        .png({ compressionLevel: 9 })
        .toBuffer()
      const uploadedFileDetails = await uploadFile(
        `${username}/${filename}`,
        compressedImage,
        contentType
      )
      logger.debug('uploadedFileDetails', uploadedFileDetails)
      return sendRedirect(event, uploadedFileDetails.url)
    }
  } catch (error) {
    logger.error(error)
    throw new Error('Internal Server Error')
  }
})
