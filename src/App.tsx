import { GithubData } from '~/utils/renderHTML'

export default function App({
  daysOnGithub,
  percentageDaysOnGithub
}: GithubData) {
  return (
    <div className="bg-white">
      <h1 className="text-lg font-bold text-green-700">{`Spent ${daysOnGithub} (${percentageDaysOnGithub}) days on Github in last 365 days.`}</h1>
    </div>
  )
}
