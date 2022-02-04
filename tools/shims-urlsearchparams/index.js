#!/usr/bin/env node

const got = require('got');
// var babel = require('@babel/core');
const fs = require('fs').promises;

const getOriginFile = async () => {
  const url = 'https://raw.githubusercontent.com/jerrybendy/url-search-params-polyfill/master/index.js';
  const { body } = await got(url);
  return body;
};

// Babels a file
// const babelit = async code => {
//   const res = await babel.transformAsync(code, { filename: 'fileincognita' });
//   return res;
// };

// const transform = code => {
//   // return code;
//   const clap =
//     '// -- https://github.com/contributorpw/google-apps-script-snippets --';
//   return code
//     .replace(/(Window.prototype.forceJURL = false;)/, `${clap}\n// $&`)
//     .replace(
//       /\/\/ feature detect for URL constructor[\s\S]+\s*if\s*\(hasWorkingUrl\)\s*return;/,
//       `\n${clap}\n/* $& */`
//     )
//     .replace(/(}\)\(window\))/, `\n${clap}\n// $&\n})(this)`);
// };

const main = async () => {
  const content = await getOriginFile();
  // const code = await babelit(body);
  // const content = transform(code.code);
  return fs.writeFile('./shims/URLSearchParams.js', content, 'utf8');
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
