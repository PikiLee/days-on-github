import clsx from 'clsx'
import { GithubData } from '../utils/renderHTML'
import { getContributionLevel } from './utils/getContributionLevel/getContributionLevel'

const backgroundColorClasses = [
  'bg-green-300',
  'bg-green-400',
  'bg-green-500',
  'bg-green-600'
]

export default function App({
  githubData: { daysOnGithub, percentageDaysOnGithub, contributionDays }
}: {
  githubData: GithubData
}) {
  return (
    <div className="bg-white p-4">
      <h1 className="text-lg font-bold text-green-500 text-center mb-2">{`Spent ${daysOnGithub} (${percentageDaysOnGithub}%) days on Github in last 365 days.`}</h1>
      <div className="grid grid-rows-7 grid-flow-col auto-cols-min gap-0.5">
        {contributionDays.map((day, index) => {
          const backgroundColorClass =
            day.contributionCount === 0
              ? 'bg-gray-200'
              : backgroundColorClasses[getContributionLevel(day.contributionCount)]
          return (
            <div
              key={index}
              className={clsx(
                'col-span-1 w-2 aspect-square rounded-[1px] border-gray-800/10 border-[0.8px]',
                backgroundColorClass
              )}
              data-contributionCount={day.contributionCount}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
