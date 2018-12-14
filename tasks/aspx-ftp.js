const gulp = require("gulp");
const logger = require('gulplog');
const ftp = require('vinyl-ftp');
const MyUtils = require('./utils.js');

const destPath = MyUtils.destPath;

gulp.task('aspx-ftp', function () {
  const remotePath = '/website1';

  const config = {
    host: '127.0.0.1',
    user: 'administrator',
    password: '123456',
    port: 21,
    parallel: 10,
    log: logger.info
  }

  const conn = ftp.create(config);

  const globs = [
    destPath + '/**/*',
  ]

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp.src(globs, {
      base: destPath,
      buffer: false
    })
    .pipe(conn.differentSize(remotePath)) // only upload newer files
    .pipe(conn.dest(remotePath));
});