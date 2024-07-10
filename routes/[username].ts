import nodeHtmlToImage from 'node-html-to-image'
import { getDaysOnGithub } from '@/utils/getDaysOnGithub/getDaysOnGithub'
import { renderHTML } from '~/utils/renderHTML'

export default eventHandler(async (event) => {
  const username = getRouterParams(event).username

  const githubData = await getDaysOnGithub(username)
  const html = await renderHTML(githubData)

  const image = await nodeHtmlToImage({
    html
  })

  setResponseHeader(event, 'Content-Type', 'image/png')

  return image
})
