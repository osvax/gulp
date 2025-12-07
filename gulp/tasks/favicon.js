import faviconImg from 'gulp-favicons';
import debug from 'gulp-debug';

export const favicon = () => {
     return app.gulp.src(`${app.paths.srcImgFavicons}`, { encoding: false })
        .pipe(faviconImg({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(app.gulp.dest(app.paths.buildImgFavicons))
        .pipe(debug({
            "title": "Favicons"
        }));
};
