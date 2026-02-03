import path from "node:path";

export default {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    hot: true,
    port: 3000,
    watchFiles: path.resolve(import.meta.dirname, "../src/template.html"),
  },
};
