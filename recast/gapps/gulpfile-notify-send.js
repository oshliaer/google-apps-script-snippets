/*
 * Using notify-send
 **/

var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function (cb) {
  exec('gapps push | while read OUTPUT; do notify-send "$OUTPUT"; done', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
