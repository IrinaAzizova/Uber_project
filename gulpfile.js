const browserSync = require('browser-sync');
const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
 
function runServer() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });  
  watch('src/*.html').on('change', browserSync.reload);
}
 
function sassToCss() {
  return src('src/sass/*.+(scss|sass)')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      rename({
        prefix: '',
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function watchChanges() {
  watch('src/sass/**/*.+(scss|sass|css)', sassToCss);
  watch('src/*.html').on('change', parallel(html));
}

function scripts() {
  return src('src/js/**/*.js')
          .pipe(dest('dist/js'));
}

function mailer() {
  return src('src/mailer/**/*')
          .pipe(dest('dist/mailer'));
}

function fonts() {
  return src('src/fonts/**/*')
          .pipe(dest('dist/fonts'));
}

function icons() {
  return src('src/icons/**/*')
          .pipe(dest('dist/icons'));
}

function img() {
  return src('src/img/**/*')
          .pipe(imagemin())
          .pipe(dest('dist/img'));
}
 
 
function defaultTask() {
  runServer();
  sassToCss();
  watchChanges();
  html();
  scripts();
  mailer();
  fonts();
  icons();
  img();  
}
 
exports.default = defaultTask;