import importContents from 'rollup-plugin-import-contents'

// https://nitro.unjs.io/config
export default defineNitroConfig({
  routeRules: {
    '/username/**': {
      redirect: '/v2/username/**'
    }
  },
  vercel: {
    functions: {
      '**': {
        maxDuration: 60
      }
    },
    config: {
      crons: [{ path: '/remove-obsolete-files', schedule: '0 1 * * *' }]
    }
  },
  rollupConfig: {
    plugins: [
      importContents({
        rules: [
          { test: /\.css$/i, mode: 'plain' },
          { test: /\.html$/i, mode: 'plain' }
        ]
      })
    ]
  }
})
