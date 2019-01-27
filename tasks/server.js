import { isProduction, bundleFiles, paths } from "./config";

import gulp from "gulp";
import Browser from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { config as webpackConfig } from "./webpack";

const browser = Browser.create();

export function server() {
  let config;

  if (isProduction) {
    config = {
      server: paths.dest,
      open: true,
    };
  } else {
    const bundler = webpack(webpackConfig);

    config = {
      server: [paths.site, paths.dest],
      open: false,
      middleware: [
        webpackDevMiddleware(bundler, {
          stats: { colors: true },
        }),
        webpackHotMiddleware(bundler),
      ],
    };
  }

  browser.init(config);

  if (!isProduction) {
    gulp.watch(`${paths.jsDest}/**/*.js`).on("change", () => browser.reload());
    gulp
      .watch(`${paths.cssDest}/**/*.css`)
      .on("change", () => browser.reload());
    gulp
      .watch(`${paths.viewDest}/**/*.html`)
      .on("change", () => browser.reload());
    gulp.watch(bundleFiles.css).on("change", () => browser.reload());
  }
}
