import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import App from '../src/App'

describe('App component', () => {
  it('should render correctly', () => {
    const html = renderToString(<App />)
    expect(html).toContain('<h1>App</h1>')
  })
})
