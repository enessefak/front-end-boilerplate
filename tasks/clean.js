import { paths } from "./config";

import del from "del";

export function clean() {
  return del([paths.dest]);
}
