#!/usr/bin/env node

const got = require('got');
const fs = require('fs').promises;

const getOriginFile = async () => {
  const url = 'https://raw.githubusercontent.com/jonathantneal/array-flat-polyfill/master/src/polyfill-flat.js';
  const { body } = await got(url);
  return body;
};

const main = async () => {
  const content = await getOriginFile();
  return fs.writeFile('./shims/Array.flat.js', content, 'utf8');
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
