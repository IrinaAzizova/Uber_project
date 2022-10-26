const {src, dest, watch, parallel} = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


server = () => {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
};

styles = () => {
    return src('src/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min"
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(dest('src/css'))
            .pipe(browserSync.stream());
};

watchUpdates = () => {
    watch('src/scss/*.(scss|sass)', parallel(styles));
    watch('src/*.html').on('change', browserSync.reload);
};

defaultTask = () => {
    watchUpdates();
    server();
    styles();
};

exports.default = defaultTask;