/** @type {import('next').NextConfig} */

const nextConfig = () => {
    return {
        reactStrictMode: false,

        modularizeImports: {
            '@mui/material': {
                transform: '@mui/material/{{member}}',
            },

            '@mui/icons-material': {
                transform: '@mui/icons-material/{{member}}',
            },
        },

        // eslint: {
        //   ignoreDuringBuilds: true,
        // },

  
  }
}

module.exports = nextConfig
