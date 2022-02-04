/**
 * @file Closest MATCH analog
 * @see {@link https://stackoverflow.com/questions/60273858/how-to-round-a-value-up-to-nearest-value-in-a-range}
 */

/**
 * Run snippet
 */
function run() {
  const list = SpreadsheetApp.getActiveSheet()
    .getRange('G2:G30')
    .getValues()
    .map((row) => parseFloat(row[0]))
    .sort();
  console.log(closest(-98, list));
}
/**
 *
 * @customfunction
 */
function CLOSEST(searchKey, range) {
  const list = Array.isArray(range) ? range.map((row) => parseFloat(row[0])).sort() : [[parseFloat(range)]];
  return closest(parseFloat(searchKey), list);
}

/**
 *
 * @param {number} searchKey
 * @param {Array.<number>} list
 */
const closest = (searchKey, list) =>
  list.reduce(function (p, c) {
    return Math.abs(c - searchKey) < Math.abs(p - searchKey) ? c : p;
  });
