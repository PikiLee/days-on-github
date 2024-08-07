// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/username/:username*',
        destination: '/v2/username/:username*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
