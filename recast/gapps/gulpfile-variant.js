var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
// var rename = require('gulp-rename');
var exec = require('child_process').exec;
var cnfg = {};
var minimist = require('minimist');

/*
var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'production' }
};
*/

var options = minimist(process.argv.slice(2) /*, knownOptions*/);
var vp = require('vinyl-paths');

gulp.task('default', ['src'], function (cb) {
  exec('gapps push | while read OUTPUT; do notify-send "$OUTPUT"; done', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('clean', function () {
  del(['src/*']);
});

gulp.task('src', ['clean'], function () {
  gulp.src('app/*').pipe(gulp.dest('src'));
});

gulp.task('init', ['gappsinit'], function () {
  gulp.src('src/*').pipe(gulp.dest('app'));
});

gulp.task('cleanbup', function () {
  del(['.backups']);
});

gulp.task('gs', function (cb) {
  var path = `.backups/${new Date().getTime()}`;

  return gulp.src(['src/**/*', './gapps.config.json'], { base: '.' }).pipe(vp(del)).pipe(gulp.dest(path));
});

gulp.task('gappsinit', ['gs'], function (cb) {
  exec(`gapps init ${options.fileId}`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
