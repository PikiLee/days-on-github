import { z } from "zod";
import axios from "axios";

export const getDaysOnGithub = cachedFunction(
  async (username: string) => {
    const GITHUB_CLIENT_TOKEN = process.env.GITHUB_CLIENT_TOKEN;
    if (!GITHUB_CLIENT_TOKEN)
      createError({
        status: 500,
        message: "Missing GITHUB_CLIENT_TOKEN environment variable",
      });

    const client = axios.create({
      baseURL: "https://api.github.com/graphql",
      headers: {
        Authorization: `bearer ${GITHUB_CLIENT_TOKEN}`,
      },
    });

    const branchSchema = z
      .object({
        id: z.string(),
        target: z.object({
          oid: z.string(),
          file: z.object({
            object: z.object({
              text: z.string(),
            }),
          }),
        }),
      })
      .nullable();

    const dataSchema = z.object({
      user: z.object({
        contributionsCollection: z.object({
          contributionCalendar: z.object({
            weeks: z.array(
              z.object({
                contributionDays: z.array(
                  z.object({
                    contributionCount: z.number(),
                    date: z.string(),
                  }),
                ),
              }),
            ),
          }),
        }),
      }),
      repository: z.object({
        master: branchSchema,
        main: branchSchema,
      }),
    });

    try {
      const res = await client.post(``, {
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
                }
                repository: repository(name: $username, owner: $username) {
                  master: ref(qualifiedName: "master") {
                    id
                    target {
                      ... on Commit {
                        oid
                        file(path: "README.md") {
                          object {
                            ... on Blob {
                              text
                            }
                          }
                        }
                      }
                    }
                  },
                  main: ref(qualifiedName: "main") {
                    id
                    target {
                      ... on Commit {
                        oid
                        file(path: "README.md") {
                          object {
                            ... on Blob {
                              text
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              `,
        variables: {
          username,
        },
      });
      const data = dataSchema.parse(res.data.data);

      const contributionDays =
        data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
          (week) => week.contributionDays,
        );
      const daysOnGithub = contributionDays.reduce((acc, day) => {
        if (day.contributionCount > 0) {
          acc += 1;
        }
        return acc;
      }, 0);
      const percentageDaysOnGithub = `${Math.round(
        (daysOnGithub / 365) * 100,
      )}%`;

      return {
        daysOnGithub,
        percentageDaysOnGithub,
      };
    } catch (error) {
      createError({
        status: 500,
        message: error,
      });
    }
  },
  {
    maxAge: 60 * 60 * 24, // 1 day
  },
);
