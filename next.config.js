const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");

const nextConfig = {
  exportPathMap: function() {
    return {
      "/": { page: "/" }
    };
  },
  webpack: (config, {}) => {
    return config;
  }
};

module.exports = withPlugins(
  [
    [
      sass,
      {
        cssModules: true,
        cssLoderOptions: {
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]"
        }
      }
    ],
    [
      images,
      {
        assetPrefix: "/"
      }
    ]
  ],
  nextConfig
);
