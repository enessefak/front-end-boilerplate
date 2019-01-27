import { paths } from "./config";

import path from "path";
import swPrecache from "sw-precache";

export function swCreate(callback) {
  return swPrecache.write(
    path.join(paths.dest, "service-worker.js"),
    {
      staticFileGlobs: [paths.dest + "/**/*.{js,html,css,png,jpg,gif}"],
      stripPrefix: paths.dest,
    },
    callback,
  );
}
