const path = require("path");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "svgs/[name].[ext]",
    // eslint-disable-next-line no-dupe-keys
    assetModuleFilename: "imgs/[name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
};
