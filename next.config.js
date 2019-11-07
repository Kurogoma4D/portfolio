const withSass = require("@zeit/next-sass");
module.exports = withSass({
    cssModules: true,
    cssLoderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    exportPathMap: function () {
        return {
            "/": { page: "/" },
        };
    },
});
