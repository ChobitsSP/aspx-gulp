const gulp = require("gulp");
const hash_src = require("gulp-hash-src");
const MyUtils = require('./utils.js');

const destPath = MyUtils.destPath;
const basePath = "./";

// html css aspx 文件添加hash
gulp.task("aspx-build", function () {
  const globs = [
    ...MyUtils.GetIgnoreList(basePath),
    basePath + "/**/*.{aspx,html,css,Master,ascx}"
  ];

  return gulp
    .src(globs)
    .pipe(MyUtils.FileFilter())
    .pipe(
      hash_src({
        build_dir: basePath,
        src_path: basePath
      })
    )
    .pipe(gulp.dest(destPath));
});