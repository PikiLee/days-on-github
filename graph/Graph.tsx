import clsx from 'clsx'

import type { GithubData } from '../utils/injectToTemplate/injectToTemplate'
import { type Tone, backgroundColorClasses, textColorClasses } from '../utils/colors'
import { getContributionLevel } from './utils/getContributionLevel/getContributionLevel'
import './index.css'

export const includeOptions = ['avatar', 'name', 'daysOnGithubText'] as const

export type Include = (typeof includeOptions)[number]

export interface GraphProps {
  githubData: GithubData
  include?: Include[]
  tone?: Tone
}

const defaultInclude: Include[] = []

export default function Graph({
  githubData: {
    daysOnGithub,
    percentageDaysOnGithub,
    contributionDays,
    name,
    login,
    avatarUrl,
  },
  include = defaultInclude,
  tone = 'green',
}: GraphProps) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div
        className={clsx(
          'flex items-center justify-center gap-2',
          textColorClasses[tone],
        )}
      >
        {include.includes('avatar') && avatarUrl && (
          <div
            className="w-9 rounded-full aspect-square overflow-hidden border-[1px] border-gray-200"
            data-testid="avatar"
          >
            <img src={avatarUrl} alt={`${name}'s avatar`} />
          </div>
        )}
        {include.includes('name') && (
          <div data-testid="name">
            <span className="text-lg font-semibold">{name}</span>
            {' '}
            <span className="text-xs opacity-60">{login}</span>
          </div>
        )}
      </div>
      {include.includes('daysOnGithubText') && (
        <h1
          className={clsx(
            'text-lg font-bold text-center',
            textColorClasses[tone],
          )}
          data-testid="daysOnGithubText"
        >
          {`Spent ${daysOnGithub} (${percentageDaysOnGithub}%) days on Github in last 365 days.`}
        </h1>
      )}
      <div className="grid grid-rows-7 grid-flow-col auto-cols-min gap-0.5">
        {contributionDays.map((day, index) => {
          const backgroundColorClass
            = day.contributionCount === 0
              ? 'bg-gray-200'
              : backgroundColorClasses[tone][
                getContributionLevel(day.contributionCount)
              ]
          return (
            <div
              key={index}
              className={clsx(
                'col-span-1 w-2 aspect-square rounded-[1px] border-gray-800/10 border-[0.8px]',
                backgroundColorClass,
              )}
              data-contribution-count={day.contributionCount}
              data-testid="grid-cell"
            >
            </div>
          )
        })}
      </div>
    </div>
  )
}
