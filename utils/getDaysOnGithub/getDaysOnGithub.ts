import { $fetch } from 'ofetch'

import type { GithubData } from '../renderHTML/renderHTML'

export const getDaysOnGithub = async (
  username: string
): Promise<GithubData | null> => {
  const NITRO_GITHUB_CLIENT_TOKEN = process.env.NITRO_GITHUB_CLIENT_TOKEN
  if (!NITRO_GITHUB_CLIENT_TOKEN) {
    throw new Error('Missing NITRO_GITHUB_CLIENT_TOKEN environment variable')
  }

  const res = await $fetch<{
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            weeks: {
              contributionDays: {
                contributionCount: number
                date: string
              }[]
            }[]
          }
        }
        name: string
        login: string
        avatarUrl: string | null
      }
    }
  }>('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${NITRO_GITHUB_CLIENT_TOKEN}`
    },
    body: {
      query: `
                query($username: String!) {
                  user: user(login: $username) {
                    contributionsCollection {
                      contributionCalendar {
                        weeks {
                          contributionDays {
                            contributionCount
                            date
                          }
                        }
                      }
                    }
                    name
    								login
                    avatarUrl
                  }
                }
                `,
      variables: {
        username
      }
    }
  })
  const data = res.data

  if (!data.user) {
    return null
  }

  const contributionDays =
    data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      week => {
        return week.contributionDays
      }
    )
  const daysOnGithub = contributionDays.reduce((acc, day) => {
    if (day.contributionCount > 0) {
      acc += 1
    }
    return acc
  }, 0)
  const percentageDaysOnGithub = Math.round((daysOnGithub / 365) * 100)

  return {
    daysOnGithub,
    percentageDaysOnGithub,
    contributionDays,
    name: data.user.name,
    login: data.user.login,
    avatarUrl: data.user.avatarUrl
  }
}
