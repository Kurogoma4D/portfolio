const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");

const nextConfig = {
  distDir: "../../dist/functions/next",
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
