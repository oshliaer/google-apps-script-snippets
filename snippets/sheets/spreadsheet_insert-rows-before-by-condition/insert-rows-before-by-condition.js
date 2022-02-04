/**
 * @file Insert empty rows before by a condition
 *
 */

/* exported userActionInsertRowsBefore */

/**
 *{@link https://stackoverflow.com/a/54731582/1393023}
 */
function runSample1() {
  /**
   * @type {conditionCallback}
   */
  var cb;

  cb = function (row, i, values) {
    // Returns true if it's not the first row, it contains an asterks
    // and there is no an empty row before
    return values[i - 1] && /\*/.test(row[0]) && values[i - 1].join('') !== '';
  };
  var sheet = SpreadsheetApp.getActiveSheet();
  insertRowBeforeByCondition_(sheet, cb);
}

/**
 *{@link https://stackoverflow.com/a/54731582/1393023}
 */
function runSample2() {
  /**
   * @type {conditionCallback}
   */
  var cb;

  cb = function (row, i, values) {
    // Returns true if it's not the first row, the first cell of a row does not equal one of previous row
    // and there is no an empty row before
    return values[i - 1] && values[i - 1][0] !== row[0] && values[i - 1].join('') !== '';
  };
  var sheet = SpreadsheetApp.getActiveSheet();
  insertRowBeforeByCondition_(sheet, cb);
}

/**
 * Insert row before by a condition
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {conditionCallback} condition insert or skip the row
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function insertRowBeforeByCondition_(sheet, condition) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  var i = values.length;
  while (i-- > 0) if (condition(values[i], i, values)) sheet.insertRowBefore(i + 1);
  return sheet;
}

/**
 * This callback is displayed as a global member.
 * @callback conditionCallback
 * @param {object[]} row Row data
 * @param {number} index Index of the row
 * @param {object[][]} values Sheet values
 * @return {boolean}
 */
