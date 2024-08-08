import process from 'node:process'
import path from 'node:path'
import fs from 'node:fs'
import sharp from 'sharp'
import { z } from 'zod'
import { launch } from 'puppeteer-core'
import chromium from '@sparticuz/chromium-min'
import type { NextRequest } from 'next/server'
import { getDaysOnGithub } from '../../../../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../../../../utils/renderHTML'
import type { Include } from '~/graph/Graph'
import { tailwindColors } from '~/graph/Graph'
import { logger } from '~/utils/logger'
import hash from '~/utils/hash/hash'
import isFileExist from '~/utils/file/isFileExist'
import uploadFile from '~/utils/file/uploadFile'
import { isDev, isVercelPreview } from '~/utils/isDev'

const localExecutablePath
  = process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const remoteExecutablePath
  = 'https://github.com/Sparticuz/chromium/releases/download/v126.0.0/chromium-v126.0.0-pack.tar'

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  try {
    const username = params.username
    logger.info({ username })

    const querySchema = z
      .object({
        tone: z.enum(tailwindColors).optional(),
        include: z
          .string()
          .optional()
          .transform(v => (v ? (v.split(',') as Include[]) : undefined)),
      })
    const searchParams = request.nextUrl.searchParams
    const query = querySchema.parse({
      tone: searchParams.get('tone') ?? undefined,
      include: searchParams.get('include') ?? undefined,
    })
    logger.info({ query })

    const filename = hash(JSON.stringify(query))
    logger.debug({ filename })

    // Do not use the cache if the request is from Vercel Preview for testing purposes
    const existedFileDetails = isVercelPreview || isDev
      ? undefined
      : await isFileExist(username, filename)

    const contentType = 'image/png'
    const headers = new Headers()
    headers.set('Cache-Control', 'public, max-age=86400') // 1 day
    if (existedFileDetails) {
      logger.info('file exists in storage')
      logger.debug('existedFileDetails', existedFileDetails)
      return Response.redirect(existedFileDetails.url)
    }
    else {
      logger.info('file does not exist in storage')
      const githubData = await getDaysOnGithub(username)
      logger.debug(
        Object.assign({}, githubData, { contributionDays: 'Too long to show' }),
      )
      if (!githubData) {
        return new Response('Not Found', {
          status: 404,
          headers,
        })
      }

      const templatePath = path.join(process.cwd(), 'index.html')
      const template = fs.readFileSync(templatePath, 'utf-8')
      const cssPath = path.join(process.cwd(), 'dist/output.css')
      const css = fs.readFileSync(cssPath, 'utf-8')
      const html = await renderHTML({ githubData, ...query }, template, css)

      const browser = await launch({
        args: isDev ? [] : chromium.args,
        executablePath: isDev
          ? localExecutablePath
          : await chromium.executablePath(remoteExecutablePath),
        headless: chromium.headless,
      })
      const page = await browser.newPage()

      // Set a larger viewport and higher device scale factor
      await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2, // Increase for higher pixel density
      })

      await page.setContent(html)
      const bodyEl = await page.$('body')
      const originalImage = await bodyEl.screenshot({
        type: 'png',
        omitBackground: true,
      })
      browser.close()

      const compressedImage = await sharp(
        Array.isArray(originalImage) ? originalImage[0] : originalImage,
      )
        .png({ compressionLevel: 9 })
        .toBuffer()
      const uploadedFileDetails = await uploadFile(
        `${username}/${filename}`,
        compressedImage,
        contentType,
      )
      logger.debug('uploadedFileDetails', uploadedFileDetails)
      return Response.redirect(uploadedFileDetails.url)
    }
  }
  catch (error) {
    logger.error(error)
    throw new Error('Internal Server Error')
  }
}

export const maxDuration = 60
