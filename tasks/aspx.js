const gulp = require("gulp");
const runSequence = require('run-sequence');

// This will run in this order:
// * build-clean
// * build-scripts and build-styles in parallel
// * build-html
// * Finally call the callback function
gulp.task('aspx', function (callback) {
  runSequence('aspx-clean',
    ['aspx-scripts', 'aspx-build'],
    // 'aspx-ftp',
    'update-time',
    callback);
});