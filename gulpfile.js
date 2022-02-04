'use strict';
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const finc = require('gulp-file-include');

// https://stackoverflow.com/questions/29511491,
// https://gist.github.com/rmckeel/b4e60922f5098ced9c50bdd96731b34a
const spawn = require('child_process').spawn;
const ms = require('merge-stream');

const packageJson = require('./package.json');

const watchDelay = (packageJson.devSettings ? packageJson.devSettings.watchDelay : undefined) || 1000;

gulp.task('br', function (done) {
  // console.log('asdfsdf', path.normalize(`${process.cwd()}/`));

  // console.log(process.argv[4]);
  // console.log(process.cwd());
  console.log('process.argv', process.argv);
  const snippet = `${path.normalize(process.argv[4])}/`;
  const config = JSON.parse(fs.readFileSync(path.join(snippet, 'config.json')));
  console.log(snippet);
  del.sync('./dist/');
  let src = [`${snippet}**/*.js`, `${snippet}**/*.ts`, `${snippet}**/*.html`, `${snippet}appsscript.json`];
  let claspConfig = '';
  if (!config.type) throw new Error('USER CONFIG ERROR: type requeried');
  if (config.type === 'single') claspConfig = `${snippet}.clasp.json`;
  else claspConfig = `settings/${config.type}/.clasp.json`;
  if (config.src) src = src.concat(config.src);
  const dist = gulp
    .src(src)
    .pipe(
      finc({
        prefix: '__file',
        basepath: '@root',
      })
    )
    .pipe(gulp.dest('./dist'), { base: snippet });
  const clcfn = gulp.src(claspConfig).pipe(gulp.dest('./'));
  return ms(dist, clcfn);
});

gulp.task('clasp', function (cb) {
  cb = cb || console.log;
  // const cmd = spawn('./node_modules/.bin/clasp', ['push'], {
  const cmd = spawn('npx', ['clasp', 'push'], {
    stdio: 'inherit',
  });
  cmd.on('close', function (code) {
    console.log('clasp exited with code ' + code);
    cb(code);
  });
});

gulp.task('develop', gulp.series('br', 'clasp'));

gulp.task('copy-sheet', function () {
  console.log(arg);
  // if (arg.name)
  return gulp
    .src('./templates/sheet_snippet/**/*.*', {
      base: './templates/sheet_snippet',
    })
    .pipe(gulp.dest(`./snippets/sheets/_auto_${arg.name || new Date().getTime()}`));
});

gulp.task(
  'watch',
  gulp.series('br', 'clasp', function watch() {
    gulp.watch(
      ['./{snippets,extra,shims,drafts,.preliminary}/**/*.{js,gs,json,html}'],
      { delay: watchDelay },
      gulp.series('br', 'clasp')
    );
  })
);

// fetch command line arguments
const arg = ((argList) => {
  const arg = {};
  let a;
  let opt;
  let thisOpt;
  let curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^-+/, '');

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }

  return arg;
})(process.argv);
