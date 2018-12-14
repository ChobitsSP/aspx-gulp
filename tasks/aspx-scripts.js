const gulp = require("gulp");
const MyUtils = require('./utils.js');

const destPath = MyUtils.destPath;
const basePath = "./";

// js文件 转es5/压缩
gulp.task('aspx-scripts', function () {
  const globs = [
    ...MyUtils.GetIgnoreList(basePath),
    basePath + "/**/*.js"
  ];

  // // js压缩
  // const uglify = require('gulp-uglify');
  // const babel = require('gulp-babel');

  return gulp.src(globs)
    .pipe(MyUtils.FileFilter())
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify({
    //   mangle: false //取消变量压缩 angularjs
    // }))
    .pipe(gulp.dest(destPath));
});