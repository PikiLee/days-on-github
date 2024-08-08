import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockGithubData } from '../utils/mockData'
import Graph, { includeOptions, tailwindColors } from './Graph'

const daysOnGithubText = `Spent ${mockGithubData.daysOnGithub} (${mockGithubData.percentageDaysOnGithub}%) days on Github in last 365 days.`

describe('component', () => {
  it('renders the component with default props', () => {
    const { container } = render(<Graph githubData={mockGithubData} />)

    expect(screen.queryByText(daysOnGithubText)).not.toBeInTheDocument()
    expect(screen.queryByText(mockGithubData.name)).not.toBeInTheDocument()
    expect(screen.queryByText(mockGithubData.login)).not.toBeInTheDocument()
    expect(
      screen.queryByAltText(`${mockGithubData.name}'s avatar`),
    ).not.toBeInTheDocument()
    expect(screen.getAllByTestId('grid-cell')).toHaveLength(365)
    expect(container).toMatchSnapshot()
  })

  it.each(includeOptions)(
    'renders the component with daysOnGithubText',
    (includeOption) => {
      const { container } = render(
        <Graph githubData={mockGithubData} include={[includeOption]} />,
      )

      expect(screen.getByTestId(includeOption)).toBeInTheDocument()
      expect(container).toMatchSnapshot()
    },
  )

  it.each(tailwindColors)(
    'applies the correct background color classes based on tone and contribution level',
    (tone) => {
      render(<Graph githubData={mockGithubData} tone={tone} />)

      const gridCells = screen.getAllByTestId('grid-cell')
      gridCells.forEach((cell) => {
        expect(cell).toHaveClass(new RegExp(`bg-(gray|${tone})`))
      })
    },
  )

  it.each(tailwindColors)(
    'applies the correct text color class based on tone',
    (tone) => {
      render(
        <Graph
          githubData={mockGithubData}
          tone={tone}
          include={['daysOnGithubText']}
        />,
      )

      const textEl = screen.getByText(daysOnGithubText)
      expect(textEl).toHaveClass(new RegExp(`text-${tone}`))
    },
  )
})
