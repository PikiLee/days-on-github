# Days on github

An API endpoint that provides an image of a GitHub contribution graph in various colors.

The graph is developed using React, converted to HTML, then transformed into an image, served using Nitro. The images are cached in Vercel blob store for one day.

![example](https://happy.apiki.me/v2/username/PikiLee?tone=yellow&include=name,avatar,daysOnGithubText)

# API

## v2

`https://happy.apiki.me/v2/username/[username]`

### Search Params

#### Tone

Change the color of the GitHub contribution graph.

##### options

'slate',
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

##### example

`https://happy.apiki.me/v2/username/PikiLee?tone=yellow`

#### Include

Show name, avatar, days-on-github text or all of them in the image.

##### Options

'name',
'avatar',
'daysOnGithubText'

##### example

`https://happy.apiki.me/v2/username/PikiLee?include=name`
`https://happy.apiki.me/v2/username/PikiLee?include=name,avatar,daysOnGithubText`

# Environment Variables

1. `NITRO_GITHUB_CLIENT_TOKEN`: [github token](https://github.com/settings/tokens?type=beta)
2. `NITRO_BLOB_READ_WRITE_TOKEN`: [vercel blob read-write token](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#read-write-token)

# Development

## Install dependencies:

```bash
pnpm install
```

## Develop React App

```bash
pnpm dev:app
```

## Develop Nitro

```bash
pnpm dev
```
