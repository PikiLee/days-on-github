import clsx from 'clsx'
import { GithubData } from '../utils/renderHTML'
import { getContributionLevel } from './utils/getContributionLevel/getContributionLevel'

export const tailwindColors = [
  'slate',
  // 'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
] as const

export type Tone = (typeof tailwindColors)[number]

const backgroundColorClasses = {
  slate: ['bg-slate-300', 'bg-slate-400', 'bg-slate-500', 'bg-slate-600'],
  // gray: ['bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600'],
  zinc: ['bg-zinc-300', 'bg-zinc-400', 'bg-zinc-500', 'bg-zinc-600'],
  neutral: [
    'bg-neutral-300',
    'bg-neutral-400',
    'bg-neutral-500',
    'bg-neutral-600'
  ],
  stone: ['bg-stone-300', 'bg-stone-400', 'bg-stone-500', 'bg-stone-600'],
  red: ['bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600'],
  orange: ['bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600'],
  amber: ['bg-amber-300', 'bg-amber-400', 'bg-amber-500', 'bg-amber-600'],
  yellow: ['bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600'],
  lime: ['bg-lime-300', 'bg-lime-400', 'bg-lime-500', 'bg-lime-600'],
  green: ['bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600'],
  emerald: [
    'bg-emerald-300',
    'bg-emerald-400',
    'bg-emerald-500',
    'bg-emerald-600'
  ],
  teal: ['bg-teal-300', 'bg-teal-400', 'bg-teal-500', 'bg-teal-600'],
  cyan: ['bg-cyan-300', 'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600'],
  sky: ['bg-sky-300', 'bg-sky-400', 'bg-sky-500', 'bg-sky-600'],
  blue: ['bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600'],
  indigo: ['bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600'],
  violet: ['bg-violet-300', 'bg-violet-400', 'bg-violet-500', 'bg-violet-600'],
  purple: ['bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600'],
  fuchsia: [
    'bg-fuchsia-300',
    'bg-fuchsia-400',
    'bg-fuchsia-500',
    'bg-fuchsia-600'
  ],
  pink: ['bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600'],
  rose: ['bg-rose-300', 'bg-rose-400', 'bg-rose-500', 'bg-rose-600']
} satisfies Record<Tone, string[]>

const textColorClasses = {
  slate: 'text-slate-500',
  // gray: 'text-gray-500',
  zinc: 'text-zinc-500',
  neutral: 'text-neutral-500',
  stone: 'text-stone-500',
  red: 'text-red-500',
  orange: 'text-orange-500',
  amber: 'text-amber-500',
  yellow: 'text-yellow-500',
  lime: 'text-lime-500',
  green: 'text-green-500',
  emerald: 'text-emerald-500',
  teal: 'text-teal-500',
  cyan: 'text-cyan-500',
  sky: 'text-sky-500',
  blue: 'text-blue-500',
  indigo: 'text-indigo-500',
  violet: 'text-violet-500',
  purple: 'text-purple-500',
  fuchsia: 'text-fuchsia-500',
  pink: 'text-pink-500',
  rose: 'text-rose-500'
}

export default function App({
  githubData: { daysOnGithub, percentageDaysOnGithub, contributionDays },
  includeText = true,
  tone = 'green'
}: {
  githubData: GithubData
  includeText?: boolean
  tone?: Tone
}) {
  return (
    <div className="bg-white p-4">
      {includeText && (
        <h1
          className={clsx(
            'text-lg font-bold text-center mb-2',
            textColorClasses[tone]
          )}
        >{`Spent ${daysOnGithub} (${percentageDaysOnGithub}%) days on Github in last 365 days.`}</h1>
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
