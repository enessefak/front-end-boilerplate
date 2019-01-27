import { isProduction, paths } from "./config";

import gulp from "gulp";
import imagemin from "gulp-imagemin";
import svgSprite from "gulp-svg-sprite";

export function images() {
  const imageminSrc = `${paths.img}/**/*.*`;

  const imageminOption = [
    imagemin.gifsicle({
      interlaced: true,
    }),
    imagemin.jpegtran({
      progressive: true,
    }),
    imagemin.optipng({
      optimizationLevel: 5,
    }),
  ];

  return gulp
    .src(imageminSrc)
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest(paths.imgDest));
}

export function svg() {
  const svgSrc = `${paths.svg}/*.svg`;

  const svgOption = [
    imagemin.svgo({
      plugins: [
        {
          removeViewBox: true,
          removeStyleElement: true,
          removeScriptElement: true,
          removeDesc: true,
          minifyStyles: true,
          convertStyleToAttrs: true,
          removeComments: true,
          removeMetadata: true,
        },
        {
          cleanupIDs: false,
        },
      ],
    }),
  ];

  const svgSpriteConfig = {
    shape: {
      dimension: {
        // Set maximum dimensions
        maxWidth: 16,
        maxHeight: 16,
      },
      spacing: {
        // Add padding
        padding: 0,
      },
      dest: "intermediate-svg", // Keep the intermediate files
    },
    mode: {
      symbol: {
        // symbol mode to build the SVG
        render: {
          scss: true,
        },
        dest: "symbol", // destination folder
        prefix: ".icon--%s", // BEM-style prefix if styles rendered
        sprite: "symbol.svg", //generated sprite name
        example: true, // Build a sample page, please!
      },
    },
  };

  return gulp
    .src(svgSrc)
    .pipe(imagemin(svgOption))
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest(paths.svgDest))
    .pipe(gulp.dest(paths.svg));
}
