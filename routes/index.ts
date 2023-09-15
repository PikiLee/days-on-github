import { z } from "zod";
import axios from "axios";
import { encode } from "js-base64";

export default eventHandler(async () => {
  const GITHUB_CLIENT_TOKEN = process.env.GITHUB_CLIENT_TOKEN;
  if (!GITHUB_CLIENT_TOKEN)
    createError({
      status: 500,
      message: "Missing GITHUB_CLIENT_TOKEN environment variable",
    });
  const USERNAME = process.env.USERNAME;
  if (!USERNAME)
    createError({
      status: 500,
      message: "Missing USERNAME environment variable",
    });

    const client = axios.create({
      baseURL: 'https://api.github.com/graphql',
      headers: {
        Authorization: `bearer ${GITHUB_CLIENT_TOKEN}`,
      },
    })

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
    const res = await client.post(
      ``,
      {
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
          username: USERNAME,
        },
      },
    );
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
    const percentageDaysOnGithub = `${Math.round(daysOnGithub / 365 * 100)}%`

    const branchName = data.repository.main ? "main" : "master";
    const branch = data.repository.main ?? data.repository.master;
    const readme = branch.target.file.object.text;
    const branchId = branch.id
    const commitId = branch.target.oid;

    const message = `Days on Github in recent 365 days: ${daysOnGithub} / 365, ${percentageDaysOnGithub}`;
    const commitMessage = `Update README.md by days--Github on ${new Date().toDateString()}`;
    const modifiedReadme = readme.replace(
      /<!-- days-on-github -->(.|\n)*<!-- days-on-github -->/,
      `<!-- days-on-github -->${message}<!-- days-on-github -->`
    );


    const commitSchema = z.object({
      createCommitOnBranch: z.object({
      commit: z.object({
        commitUrl: z.string(),
      }),
    })
    });
    const res2 = await client.post(
      ``,
      {
        query: `
        mutation($expectedHeadOid: GitObjectID!, $contents: Base64String!, $branchId: ID!, $commitMessage: String!) {
          createCommitOnBranch(
            input: {
              branch: {id: $branchId},
              message: {headline: $commitMessage},
              fileChanges: {
                additions: [
                  {
                    path: "README.md",
                    contents: $contents
                  }
                ]
              },
              expectedHeadOid: $expectedHeadOid
            }
          ) {
            commit {
              commitUrl
            }
          }
        }
        `,
        variables: {
          expectedHeadOid: commitId,
          contents: encode(modifiedReadme),
          branchId,
          commitMessage,
        }
      }
    );

    console.dir(res2.data, {
      depth: null
    });
    const data2 = commitSchema.parse(res2.data.data);
    const commitUrl = data2.createCommitOnBranch.commit.commitUrl;

    return {
      percentageDaysOnGithub,
      daysOnGithub,
      readme,
      branchId,
      modifiedReadme,
      branchName,
      commitId,
      commitUrl
    };
  } catch (error) {
    console.dir(error);
    createError({
      status: 500,
      message: error,
    });
  }
});
