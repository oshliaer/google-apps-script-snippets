/**
 *
 */
function run() {
  console.log(base26ABCto10('ABC'));
  console.log(base26ABCfrom10(731));
}

/**
 * @see {@link https://t.me/googleappsscriptrc/37031}
 *
 * @param {string} string Any string as a column name 'A', 'Z', 'ABC'
 * @returns {number} The column number
 */
function base26ABCto10(string) {
  return [...string].reduceRight(
    (p, c, i, a) => p + (c.toUpperCase().charCodeAt(0) - 64) * 26 ** (a.length - i - 1),
    0
  );
}

/**
 * @see {@link https://stackoverflow.com/a/45789255/1393023}
 *
 * @param {number} number Positive integer. A column number
 * @returns {string} The column name
 */
function base26ABCfrom10(number) {
  let num = number;
  let sfx = '';
  while (num > 0) {
    const cd = (num - 1) % 26;
    sfx = String.fromCharCode(65 + cd) + sfx;
    num = Math.floor((num - cd) / 26);
  }
  return sfx;
}
