# Days on github

An API endpoint that provides an image of a GitHub contribution graph.

![example](https://happy.apiki.me/v2/username/PikiLee?tone=yellow&include=name,avatar,daysOnGithubText)

# API

## v2

https://happy.apiki.me/v2/username/[username]

### Search Params

#### Tone

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

https://happy.apiki.me/v2/username/PikiLee?tone=yellow

#### Include

##### options

'name',
'avatar',
'daysOnGithubText'

##### example

https://happy.apiki.me/v2/username/PikiLee?include=name,avatar,daysOnGithubText

## v1

https://happy.apiki.me/username/[username]

## Legacy

https://days-on-github.vercel.app/username

# Features

1. Compile React app to html and then convert html to image.

# Environment Variables

1. `NITRO_GITHUB_CLIENT_TOKEN`: [github token](https://github.com/settings/tokens?type=beta)
2. See .env.example for Certbot related Environment Variables

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development

Start the development server on <http://localhost:3000>

### Develop React App

```bash
pnpm run dev:app
```

### Develop Nitro

```bash
pnpm run dev
```

### Develop docker

```bash
pnpm run dev:docker
```

## Production

We use docker to deploy the application

1. Set domain in 'user_conf.d/server.conf'
2. Copy 'compose.yaml', 'compose.prod.yaml', '.env', 'user_conf.d' to the server and run the following command.

```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```
