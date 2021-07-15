import { bundleFiles, isProduction, paths } from "./config";
import path from "path";
import gulp from "gulp";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import { stream as critical } from "critical";
import rename from "gulp-rename";

export function css() {
  const scssSrc = bundleFiles.css;

  const sassOptions = {
    includePaths: [path.join(paths.project, "node_modules")],
  };

  const sass = gulpSass(require("sass"))
  if (isProduction) {
    return gulp
      .src(scssSrc)
      .pipe(sass({...sassOptions, outputStyle: "compressed" }))
      .pipe(gulp.dest(paths.cssDest));
  }
  return gulp
    .src(scssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({...sassOptions}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.cssDest));
}

export function criticalCss() {
  const criticalCssconfig = {
    inline: true,
    base: paths.dest,
    dimensions: [
      {
        height: 200,
        width: 500,
      },
      {
        height: 900,
        width: 1200,
      },
    ],
    minify: true,
  };

  return gulp
    .src(`${paths.dest}/*.html`)
    .pipe(critical(criticalCssconfig))
    .on("error", function(err) {
      console.log(err.message);
    })
    .pipe(rename({ suffix: "-critical" }))
    .pipe(gulp.dest(paths.dest));
}
