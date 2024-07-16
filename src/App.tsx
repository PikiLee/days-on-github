import clsx from 'clsx'
import { GithubData } from '../utils/renderHTML'
import { getContributionLevel } from './utils/getContributionLevel/getContributionLevel'

export type Tone = 'green' | 'sky' | 'red' | 'amber'

const backgroundColorClasses = {
  green: ['bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600'],
  sky: ['bg-sky-300', 'bg-sky-400', 'bg-sky-500', 'bg-sky-600'],
  red: ['bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600'],
  amber: ['bg-amber-300', 'bg-amber-400', 'bg-amber-500', 'bg-amber-600']
} satisfies Record<Tone, string[]>

export default function App({
  githubData: { daysOnGithub, percentageDaysOnGithub, contributionDays },
  includeText = true,
  tone = 'green'
}: {
  githubData: GithubData
  includeText?: boolean
  tone?: 'green' | 'sky' | 'red' | 'amber'
}) {
  return (
    <div className="bg-white p-4">
      {includeText && (
        <h1 className="text-lg font-bold text-green-500 text-center mb-2">{`Spent ${daysOnGithub} (${percentageDaysOnGithub}%) days on Github in last 365 days.`}</h1>
      )}
      <div className="grid grid-rows-7 grid-flow-col auto-cols-min gap-0.5">
        {contributionDays.map((day, index) => {
          const backgroundColorClass =
            day.contributionCount === 0
              ? 'bg-gray-200'
              : backgroundColorClasses[tone][
                  getContributionLevel(day.contributionCount)
                ]
          return (
            <div
              key={index}
              className={clsx(
                'col-span-1 w-2 aspect-square rounded-[1px] border-gray-800/10 border-[0.8px]',
                backgroundColorClass
              )}
              data-contribution-count={day.contributionCount}
              data-testid="grid-cell"
            ></div>
          )
        })}
      </div>
    </div>
  )
}
