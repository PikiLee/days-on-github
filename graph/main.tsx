import { createRoot } from 'react-dom/client'

import { mockGithubData } from '../utils/mockData'
import Graph, { tailwindColors } from './Graph'

const root = createRoot(document.getElementById('root'))
root.render(
  <>
    {tailwindColors.map(tone => (
      <Graph
        githubData={mockGithubData}
        tone={tone}
        key={tone}
        include={['daysOnGithubText', 'avatar', 'name']}
      />
    ))}
  </>,
)
