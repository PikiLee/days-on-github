// https://nitro.unjs.io/config
export default defineNitroConfig({
  routeRules: {
    '/*': {
      redirect: '/v2/username/*'
    }
  }
})
