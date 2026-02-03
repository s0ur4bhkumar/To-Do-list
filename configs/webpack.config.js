import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default async (env) => {
  const envConfig = await import(`./webpack.${env.env}.js`);
  return merge(commonConfig, envConfig.default);
};
