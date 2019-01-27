import process from "process";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const relativePath = (...paths) => {
  if (!paths[0].includes("./")) return [".", ...paths].join("/");
  return paths.join("/");
};

const paths = {
  project: process.cwd(),
  site: "site",
  dest: isProduction ? "dist" : "tmp",
  assets: "assets",
  _img: "img",
  _svg: "svg",
  _svgSymbols: "intermediate-svg",
  _js: "js",
  _css: "css",
  _view: "template",
  get img() {
    return relativePath(this.site, this.assets, this._img);
  },
  get imgDest() {
    return relativePath(this.dest, this.assets, this._img);
  },
  get svg() {
    return relativePath(this.site, this.assets, this._svg);
  },
  get svgDest() {
    return relativePath(this.dest, this.assets, this._svg);
  },
  get svgSymbolDest() {
    return relativePath(this.dest, this.assets, this._svg, this._svgSymbols);
  },
  get css() {
    return relativePath(this.site, this.assets, this._css);
  },
  get cssDest() {
    return relativePath(this.dest, this.assets, this._css);
  },
  get js() {
    return relativePath(this.site, this.assets, this._js);
  },
  get jsDest() {
    return relativePath(this.dest, this.assets, this._js);
  },
  get view() {
    return relativePath(this.site, this._view);
  },
  get viewDest() {
    return this.dest;
  },
};

const bundleFiles = {
  js: {
    main: [
      path.resolve(paths.js, "main.js"),
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
    ],
  },
  css: [`${paths.css}/main.scss`],
};

export { isProduction, paths, bundleFiles };
