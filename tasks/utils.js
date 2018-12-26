const gulp = require('gulp');
const moment = require("moment");
const filter = require("gulp-custom-filter");
const fs = require('fs');
const config = GetConfig();

/**
 * 筛选最近修改的文件
 * @param {File} file
 * @returns
 */
function FileFilter() {
  return filter(file => config.mtime ? moment(file.stat.mtime).isAfter(moment(config.mtime)) : true);
}

function GetConfig() {
  const someFile = './tasks/config.json';
  const fs = require('fs');

  if (!fs.existsSync(someFile)) return {};

  const json = fs.readFileSync(someFile, 'utf8');
  return JSON.parse(json);
}

gulp.task('update-time', function (callback) {
  const someFile = './tasks/config.json';
  config.mtime = moment().format('YYYY-MM-DD HH:mm:ss');
  fs.writeFile(someFile, JSON.stringify(config), 'utf8', callback);
});

/**
 * 获取忽略的文件夹
 * @param {String} basePath
 * @returns
 */
function GetIgnoreList(basePath) {
  const folders = [
    "node_modules",
    "tasks",

    "bin",
    "obj",
    "Log",
    "static",

    "*.html",
    "gulpfile.js",
  ];

  const arrays = folders.map(t => {
    const arr = [`!${basePath}/${t}`];

    if (t.indexOf('.') === -1) {
      arr.push(`!${basePath}/${t}/**`);
    }

    return arr;
  });
  const merged = [].concat.apply([], arrays);
  return merged;
}

module.exports = {
  FileFilter,
  GetIgnoreList,
  destPath: './tasks/dist',
}