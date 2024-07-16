import { createRoot } from 'react-dom/client'
import { mockGithubData } from '../utils/mockData'
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(<App githubData={mockGithubData} tone="sky" />)
