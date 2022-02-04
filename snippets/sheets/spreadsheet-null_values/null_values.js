/**
 * @file Null values
 * @url
 */

/**
 *
 */
function run() {
  SpreadsheetApp.getActiveSheet()
    .getRange('A1:B2')
    .setValues([
      [1, null],
      [null, 2],
    ]);
}
