const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");
const requireContext = require("require-context");
require("dotenv").config();

const nextConfig = {
  env: {
    cms_api_key: process.env.CMS_API_KEY
  },
  webpack: (config, {}) => {
    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000
          }
        }
      },
      {
        test: /\.md$/,
        use: "raw-loader"
      }
    );

    config.externals = config.externals || [];
    config.externals.push({
      createjs: "createjs"
    });
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
          importLoaders: 2,
          localIdentName: "[local]___[hash:base64:5]"
        }
      }
    ],
    images
  ],
  nextConfig
);
