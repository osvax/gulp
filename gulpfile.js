import gulp from 'gulp';
import browserSync from 'browser-sync';


const methodCompiller = 'sass'; // Меняем Scss на Sass в зависимости от нужд
const srcFolder = './src';
const buildFolder = './app';

export const paths = {
  base: {
    src: srcFolder,
    build: buildFolder,
  },
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/${methodCompiller}/**/*.${methodCompiller}`, 
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
  srcImgFavicons: `${srcFolder}/favicon.png`,
  buildImgFavicons: `${buildFolder}`,
};



import { clean } from './gulp/tasks/clean.js';
import { svgSprites } from './gulp/tasks/sprite.js';
import { styles } from './gulp/tasks/styles.js';
import { stylesBackend } from './gulp/tasks/styles-backend.js';
import { scripts } from './gulp/tasks/scripts.js';
import { scriptsBackend } from './gulp/tasks/scripts-backend.js';
import { resources } from './gulp/tasks/resources.js';
import { images } from './gulp/tasks/images.js';
import { webpImages } from './gulp/tasks/webp.js';
import { favicon } from './gulp/tasks/favicon.js';
import { htmlInclude } from './gulp/tasks/html-include.js';
import { cacheTask } from './gulp/tasks/cache.js';
import { rewrite } from './gulp/tasks/rewrite.js';
import { htmlMinify } from './gulp/tasks/html-minify.js';
import { zipFiles } from './gulp/tasks/zip.js';
import { styleRename } from "./gulp/tasks/rename.js";
import { jsRename } from "./gulp/tasks/rename.js";
import { htaccess } from "./gulp/tasks/rename.js";


global.app = {
  gulp,
  isProd: process.argv.includes('--build'),
  paths,
}

const watcher = () => {
  browserSync.init({
    server: {
      baseDir: `${app.paths.base.build}`
    },
    notify: false,
    port: 3000,
	browser: "c:\\Program Files\\Firefox Developer Edition\\firefox.exe",
  });



  gulp.watch(app.paths.srcScss, styles);
  gulp.watch(app.paths.srcFullJs, scripts);
  gulp.watch(`${app.paths.srcPartialsFolder}/*.html`, htmlInclude);
  gulp.watch(`${app.paths.base.src}/*.html`, htmlInclude);
  gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
  gulp.watch(app.paths.srcSvg, svgSprites);
  gulp.watch(app.paths.srcImgFavicons, favicon);
}

const dev = gulp.series(clean, htmlInclude, scripts, styles, resources, images, favicon, webpImages, svgSprites, watcher);
const backend = gulp.series(clean, htmlInclude, scriptsBackend, stylesBackend, resources, images, webpImages, svgSprites);
const build = gulp.series(clean, htmlInclude, scripts, styles, styleRename, jsRename, htaccess, resources, images, webpImages, svgSprites, /*htmlMinify*/);
const cache = gulp.series(cacheTask, rewrite);
const zip = zipFiles;

export { dev }
export { build }
export { backend }
export { cache }
export { zip }

gulp.task('default', dev);
