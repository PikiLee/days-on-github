import nodeHtmlToImage from 'node-html-to-image'
import puppeteerCore from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'
import { getDaysOnGithub } from '../utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '../utils/renderHTML'

export default eventHandler(async event => {
  const username = getRouterParams(event).username

  const githubData = await getDaysOnGithub(username)
  const storage = useStorage('assets:server')
  const template = await storage.getItem<string>('index.html')
  const css = await storage.getItem<string>('output.css')
  const html = await renderHTML(githubData, template, css)

  const image = await nodeHtmlToImage({
    html,
    puppeteer: puppeteerCore,
    puppeteerArgs: {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: false
    }
  })

  setResponseHeader(event, 'Content-Type', 'image/png')

  return image
})
