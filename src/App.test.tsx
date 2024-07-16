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

  // todo: fix this test
  it.skip('applies the correct background color classes based on tone and contribution level', () => {
    render(<App githubData={mockGithubData} tone="red" />)

    const gridCells = screen.getAllByTestId('grid-cell')
    gridCells.forEach((cell, index) => {
      const contributionCount = index % 5
      const expectedClass =
        contributionCount === 0
          ? 'bg-gray-200'
          : `bg-red-${300 + contributionCount * 100}`
      expect(cell).toHaveClass(expectedClass)
    })
  })
})
