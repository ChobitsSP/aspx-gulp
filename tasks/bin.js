const gulp = require("gulp");
const logger = require("gulplog");
const ftp = require("vinyl-ftp");
const filter = require("gulp-custom-filter");
const moment = require("moment");

/**
 * 筛选最近5分钟内修改的文件
 * @param {File} file
 * @returns
 */
function MyFilter(file) {
  const flag = moment(file.stat.mtime).isAfter(moment().add(-5, "minutes"));
  return flag;
}

const config = {
  host: "127.0.0.1",
  user: "administrator",
  password: "123456",
  parallel: 10,
  log: logger.info.bind(logger)
};

gulp.task("bin", function () {
  const conn = ftp.create(config);

  const remotePath = "/website1/bin";
  const basePath = "./bin/Release/PublishOutput/bin";
  const globs = [basePath + "/*.dll"];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance
  return gulp
    .src(globs, {
      base: basePath,
      buffer: false
    })
    .pipe(filter(MyFilter))
    .pipe(conn.newerOrDifferentSize(remotePath)) // only upload newer files
    .pipe(conn.dest(remotePath));
});