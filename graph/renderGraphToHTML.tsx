import type { GraphProps } from './Graph'
import Graph from './Graph'

export async function renderGraphToHTML(props: GraphProps) {
  const html = (await import('react-dom/server')).renderToString(
    <Graph {...props} />,
  )
  return html
}
