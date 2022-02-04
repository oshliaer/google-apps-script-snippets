#!/usr/bin/env node

const fs = require('fs').promises;

const main = async () => {
  return fs.copyFile('node_modules/jsonata/jsonata-es5.js', 'shims/jsonata.js');
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
