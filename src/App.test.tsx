import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { mockGithubData } from '../utils/mockData'
import App, { tailwindColors } from './App'

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

  it.each(tailwindColors)(
    'applies the correct background color classes based on tone and contribution level',
    tone => {
      render(<App githubData={mockGithubData} tone={tone} />)

      const gridCells = screen.getAllByTestId('grid-cell')
      gridCells.forEach(cell => {
        expect(cell).toHaveClass(new RegExp(`bg-(gray|${tone})`))
      })
    }
  )

  it.each(tailwindColors)(
    'applies the correct text color class based on tone',
    tone => {
      render(<App githubData={mockGithubData} tone={tone} />)

      const textEl = screen.getByText(text)
      expect(textEl).toHaveClass(new RegExp(`text-${tone}`))
    }
  )
})