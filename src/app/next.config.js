const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");
const requireContext = require("require-context");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  target: "serverless",
  exportPathMap: () => {
    return {
      "/": { page: "/" }
    };
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

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    config.resolve = {
      ...config.resolve,
      modules: ["node_modules", "/"]
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      Types: path.resolve(__dirname, "interfaces/")
    };

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
