var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var exec = require('child_process').exec;
var replace = require('gulp-replace');
var debug = require('gulp-debug');

gulp.task('gs', ['googleanalytics'], function (cb) {
  return gulp.src(['./*.gs']).pipe(gulp.dest('src'));
});

gulp.task('clean', function () {
  return del.sync(['src/*']);
});

gulp.task('gapps', ['gs'], function (cb) {
  console.log('googleanalytics');
  exec('gapps push', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('googleanalytics', ['clean'], function () {
  gulp
    .src(['./index.html'], { base: './' })
    .pipe(debug())
    .pipe(
      replace('<!-- googleanalytics.html -->', function (match) {
        return fs.readFileSync('./googleanalytics.html');
      })
    )
    .pipe(gulp.dest('src'));
});

gulp.task('default', ['gapps'], function () {
  return;
});
