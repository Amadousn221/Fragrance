/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    silenceDeprecations: ["import", "global-builtin", "color-functions", "mixed-decls"],
  },
};

export default nextConfig;
