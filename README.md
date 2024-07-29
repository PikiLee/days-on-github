# Days on github

An API endpoint that provides an image of a GitHub contribution graph in various colors.

The graph is developed using React, converted to HTML, then transformed into an image, and served using Nitro.

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

## v1

`https://happy.apiki.me/username/[username]`

## Legacy

`https://days-on-github.vercel.app/[username]`

# Environment Variables

1. `NITRO_GITHUB_CLIENT_TOKEN`: [github token](https://github.com/settings/tokens?type=beta)
2. See .env.example for Certbot related Environment Variables

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

## Develop docker

```bash
pnpm dev:docker
```

## Production

We use docker to deploy the application

1. Set domain in 'user_conf.d/server.conf'.
2. Put `NITRO_GITHUB_CLIENT_TOKEN` in '.env' file.
3. Copy 'compose.yaml', 'compose.prod.yaml', '.env', 'user_conf.d' to the server and run the following command.

```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```
