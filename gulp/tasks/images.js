import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import newer from "gulp-newer";

export const images = () => {
  return app.gulp.src([`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`], { encoding: false })
     .pipe(newer(app.paths.buildImgFolder))
     .pipe(gulpif(app.isProd, imagemin()))
    .pipe(app.gulp.dest(app.paths.buildImgFolder))
};



