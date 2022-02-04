var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var cnfg = require('./gapps.config.json');
var vp = require('vinyl-paths');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');

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
  gulp
    .src('node_modules/alasql/dist/alasql.js')
    .pipe(
      removeEmptyLines({
        removeComments: true,
      })
    )
    .pipe(strip())
    .pipe(rename('z_alasql.gs'))
    .pipe(gulp.dest('src'));
});

gulp.task('init', ['gappsexec'], function () {
  gulp.src(['src/*.html', 'src/*.gs', 'src/*.js']).pipe(gulp.dest('.'));
});

gulp.task('cleanbup', function () {
  del(['.backups']);
});

gulp.task('gs', function (cb) {
  var path = `.backups/${new Date().getTime()}`;

  return gulp.src(['src/**/*', './gapps.config.json'], { base: '.' }).pipe(vp(del)).pipe(gulp.dest(path));
});

gulp.task('gappsexec', ['gs'], function (cb) {
  exec(`gapps init ${cnfg.fileId}`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
