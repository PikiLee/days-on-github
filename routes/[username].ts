import { z } from "zod";
import axios from "axios";
import sharp from "sharp";

export const getGiuhubData = cachedFunction(async (username: string) => {
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

  const readmeSchema = z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: z.object({
          weeks: z.array(
            z.object({
              contributionDays: z.array(
                z.object({
                  contributionCount: z.number(),
                  date: z.string(),
                })
              ),
            })
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
        username: username,
      },
    });
    // return res.data.data;
    const data = readmeSchema.parse(res.data.data);

    const contributionDays =
      data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays
      );
    const daysOnGithub = contributionDays.reduce((acc, day) => {
      if (day.contributionCount > 0) {
        acc += 1;
      }
      return acc;
    }, 0);
    const percentageDaysOnGithub = `${Math.round((daysOnGithub / 365) * 100)}%`;

    const message = `Days on Github in recent 365 days: ${daysOnGithub} / 365, ${percentageDaysOnGithub}`;

    return message;
  } catch (error) {
    console.dir(error);
    createError({
      status: 500,
      message: error,
    });
  }
});

export default eventHandler(async (event) => {
  const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL;
  if (!SUPABASE_PROJECT_URL)
    createError({
      status: 500,
      message: "Missing SUPABASE_PROJECT_URL environment variable",
    });
  const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
  if (!SUPABASE_API_KEY)
    createError({
      status: 500,
      message: "Missing SUPABASE_API_KEY environment variable",
    });
  const SUPABASE_BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;
  if (!SUPABASE_BUCKET_NAME)
    createError({
      status: 500,
      message: "Missing SUPABASE_BUCKET_NAME environment variable",
    });

    const username = getRouterParams(event).username;
  const message = await getGiuhubData(username);
  const buffer = await sharp({
    text: {
      text: `<span foreground="black">${message}</span>`,
      rgba: true,
      dpi: 72,
    },
  })
    .png()
    .toBuffer();

  setResponseHeader(event, "Content-Type", "image/png");
  return buffer
});