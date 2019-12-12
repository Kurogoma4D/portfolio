const withPlugins = require("next-compose-plugins");
const sass = require("@zeit/next-sass");
const images = require("next-images");
const requireContext = require("require-context");

const nextConfig = {
  exportPathMap: function() {
    const context = requireContext("../../src/app/posts", true, /\.md$/);
    const keys = context.keys();
    const data = keys.map(key => {
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      return slug;
    });

    const pages = data.reduce(
      (pages, slug) =>
        Object.assign({}, pages, {
          [`/works/${slug}`]: { page: "/works/[slug]" }
        }),
      {}
    );

    return Object.assign({}, pages, {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/skills": { page: "/skills" },
      "/works": { page: "/works/index" }
    });
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
