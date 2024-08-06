import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', '.output', 'node-modules', '.vercel', '.nitro', '**/node-modules/**'],
  formatters: true,
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
})
