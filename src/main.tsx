import { createRoot } from 'react-dom/client'
import { mockGithubData } from '../utils/mockData'
import App, { tailwindColors } from './App'

const root = createRoot(document.getElementById('root'))
root.render(
  <>
    {tailwindColors.map(tone => (
      <App
        githubData={mockGithubData}
        tone={tone}
        key={tone}
        include={['daysOnGithubText', 'avatar', 'name']}
      />
    ))}
  </>
)
