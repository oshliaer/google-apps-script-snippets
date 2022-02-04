var gulp = require('gulp');
var del = require('del');
var exec = require('child_process').exec;

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
  gulp.src(['*.html', '*.gs', '*.js', '!gulpfile.js']).pipe(gulp.dest('src'));
});

gulp.task('init', function () {
  gulp.src(['src/*.html', 'src/*.gs', 'src/*.js']).pipe(gulp.dest('.'));
});
