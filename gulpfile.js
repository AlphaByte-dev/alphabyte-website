const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const env = require('postcss-preset-env');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const flatten = require('gulp-flatten');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require('gulp-file-include');

/* LIVE DEV WEBSERVER */
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    port: 3000,
    notify: false,
    injectChanges: true
  });

  gulp.watch('src/css/**/*', { ignoreInitial: false }, gulp.series(['sass']));
  gulp.watch('src/js/**/*', { ignoreInitial: false }, gulp.series(['js']));
  gulp.watch('src/images/**/*', { ignoreInitial: false }, gulp.series(['images']));
  gulp.watch('src/data/**/*', { ignoreInitial: false }, gulp.series(['data']));
  gulp.watch(['src/**/*.html'], { ignoreInitial: false }, gulp.series(['html', 'inject']));
  gulp.watch('dist/*').on('change', browserSync.reload);
});

/* CLEAN DIST FILES */
gulp.task('clean', () => {
  return del([
      'dist/',
  ]);
});

/* HTML */
gulp.task('html', function () {
  return gulp.src(['src/*.html', 'src/pages/*.html'])
    .pipe(flatten())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}));
});

/* SASS */
gulp.task('sass', function () {
  const plugins = [
    env(),
    autoprefixer()
  ];
  return gulp.src('src/css/**/*.scss')
    .pipe(sourcemaps.init())
    // .pipe(flatten())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(browserSync.reload({stream: true}));
});

/* JS */
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    // .pipe(flatten())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.reload({stream: true}));
});

/* IMAGES */
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/images/'))
    .pipe(browserSync.reload({stream: true}));
});

/* IMAGES */
gulp.task('data', function () {
  return gulp.src('src/data/**/*')
    .pipe(gulp.dest('dist/assets/data/'))
    .pipe(browserSync.reload({stream: true}));
});

/* INJECT CSS AND JS INTO HTML */
gulp.task('inject', function () {
  const sources = gulp.src(['dist/assets/js/all/*.js', 'dist/assets/css/all/*.css'], { read: false });

  return gulp.src('dist/*.html')
    .pipe(inject(sources, { relative: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(['clean', 'sass', 'js', 'images', 'data', 'html', 'inject']));

gulp.task('default', gulp.series(['serve']));
