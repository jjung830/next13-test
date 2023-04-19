/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: [
      "www.madwell.com",
      "madwell.com",
      "madwellstaging.wpengine.com",
      "devmadwell.wpengine.com",
      "madwell-nextjs-madwell.vercel.app",
      "madwell-nextjs-git-main-madwell.vercel.app",
      "madwell-nextjs-bo9juip5b-madwell.vercel.app",
      "madwell-nextjs-fawn.vercel.app",
      "madwellcom.madwell.greg",
      "madwell2023.madwell.greg",
      "mw.madwell.jinook",
      "mw2023.madwell.jinook",
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "components")],
    prependData: `@import '@styles/variables.scss';`,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    appDir: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
