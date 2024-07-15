# Days on github

Show how many days you have spend on Github in the last 365 days in your Github profile.

![example](https://github.com/PikiLee/days-on-github/assets/37203836/81f370f6-aea2-437c-93f5-eaf685cc0d8b)

# Usage

Add `[](https://happy.apiki.me/username/[username])` to your profile repository's `README.md`

## Legacy
Add `[](https://days-on-github.vercel.app/username)` to your profile repository's `README.md`

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
