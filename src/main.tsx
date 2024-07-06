import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(<App daysOnGithub={200} percentageDaysOnGithub={50} />)
