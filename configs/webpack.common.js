import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: path.resolve(import.meta.dirname, "../src/index.js"),
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "..", "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(import.meta.dirname, "../src/template.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/i,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
