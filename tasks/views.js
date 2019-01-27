import { isProduction, paths } from "./config";
import gulp from "gulp";
import pug from "gulp-pug";

export function pugjs() {
  const pugjsSrc = `${paths.view}/**/*.pug`;

  const pugjsOptions = {
    filename: "index",
    pretty: isProduction,
  };

  return gulp
    .src(pugjsSrc)
    .pipe(pug(pugjsOptions))
    .pipe(gulp.dest(paths.viewDest));
}
