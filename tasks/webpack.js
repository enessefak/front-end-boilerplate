import { bundleFiles, isProduction, paths } from "./config";
import path from "path";
import webpack from "webpack";

export let config = {
  context: paths.project,
  entry: bundleFiles.js,

  output: {
    filename: "[name]-bundle.js",
    path: path.join(paths.project, paths.jsDest),
  },

  mode: isProduction ? "production" : "development",

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`,
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          enforce: true,
          chunks: "all",
        },
      },
    },
  },
};

export function scripts() {
  return new Promise(resolve =>
    webpack(config, (err, stats) => {
      if (err) console.log("Webpack", err);

      console.log(
        stats.toString({
          /* stats options */
        }),
      );

      resolve();
    }),
  );
}
