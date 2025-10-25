const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");

// Пути
const paths = {
  scss: "./scss/**/*.scss",
  css: "./css"
};

// Компиляция SCSS → CSS
function styles() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(paths.css))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css));
}

// Watcher
function watch() {
  gulp.watch(paths.scss, styles);
}

exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);