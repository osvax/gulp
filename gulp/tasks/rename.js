import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import minify from "gulp-minify";
import sourcemaps from "gulp-sourcemaps";


export const styleRename = () => {
  return app.gulp.src(`${app.paths.buildCssFolder}/*.css`, { sourcemaps: !app.isProd })
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
        level: {
          1: {
            specialComments: 0,
            removeEmpty: true,
            removeWhitespace: true,
          },
          2: {
            mergeMedia: true,
            removeEmpty: true,
            removeDuplicateFontRules: true,
            removeDuplicateMediaBlocks: true,
            removeDuplicateRules: true,
            removeUnusedAtRules: false,
          },
        },
      })
    )
    .pipe(sourcemaps.write())
    .pipe(app.gulp.dest(app.paths.buildCssFolder, { sourcemaps: '.' }));
};

export const jsRename = () => {
  return app.gulp.src(`${app.paths.buildJsFolder}/*.js`, { sourcemaps: !app.isProd })
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      minify({
        ext: {
          src: "-debug.js",
          min: ".js",
        },
        exclude: ["tasks"],
        ignoreFiles: [".combo.js", "-min.js"],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(app.gulp.dest(app.paths.buildJsFolder, { sourcemaps: "." }));
};