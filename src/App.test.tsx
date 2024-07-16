import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockGithubData } from '../utils/mockData'
import App from './App'

const text = `Spent ${mockGithubData.daysOnGithub} (${mockGithubData.percentageDaysOnGithub}%) days on Github in last 365 days.`

describe('App Component', () => {
  it('renders the component with default props', () => {
    const { container } = render(<App githubData={mockGithubData} />)

    expect(screen.getByText(text)).toBeInTheDocument()
    expect(screen.getAllByTestId('grid-cell')).toHaveLength(365)
    expect(container).toMatchSnapshot()
  })

  it('renders the component without text', () => {
    const { container } = render(
      <App githubData={mockGithubData} includeText={false} />
    )

    expect(screen.queryByText(text)).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it.each(['green', 'sky', 'red', 'amber'] as const)(
    'applies the correct background color classes based on tone and contribution level',
    tone => {
      const { container } = render(
        <App githubData={mockGithubData} tone={tone} />
      )

      const gridCells = screen.getAllByTestId('grid-cell')
      gridCells.forEach(cell => {
        expect(cell).toHaveClass(new RegExp(`bg-(gray|${tone})`))
      })
      expect(container).toMatchSnapshot()
    }
  )
})
