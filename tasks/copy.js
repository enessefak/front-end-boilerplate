import { paths } from "./config";

import gulp from "gulp";

export function copy() {
  const copyFiles = [
    `${paths.site + paths.assets}/fonts/**/*`,
    `${paths.site}/manifest.json`,
  ];

  return gulp.src(copyFiles).pipe(gulp.dest(paths.dest));
}
