import type { GraphProps } from './Graph'
import Graph from './Graph'

export async function render(props: GraphProps) {
  const html = (await import('react-dom/server')).renderToString(
    <Graph {...props} />,
  )
  return html
}
