// https://nitro.unjs.io/config
export default defineNitroConfig({
  routeRules: {
    '/username/**': {
      redirect: '/v2/username/**'
    }
  },
  rollupConfig: {
    external: ['puppeteer-core', '@sparticuz/chromium']
  }
})
