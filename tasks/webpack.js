import { bundleFiles, isProduction, paths } from "./config";
import path from "path";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";

export let config = {
  context: paths.project,
  entry: bundleFiles.js,

  output: {
    filename: "[name]-bundle.js",
    path: path.join(paths.project, paths.jsDest),
  },
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"],
          },
          {
            use: ["raw-loader", "pug-plain-loader"],
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
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
  devtool: "#eval-source-map",
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
