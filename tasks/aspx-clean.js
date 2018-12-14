const gulp = require("gulp");
const clean = require('gulp-clean');
const MyUtils = require('./utils.js');

const destPath = MyUtils.destPath;

gulp.task('aspx-clean', function () {
  return gulp.src(destPath, {
      read: false
    })
    .pipe(clean({
      force: true
    }));
});