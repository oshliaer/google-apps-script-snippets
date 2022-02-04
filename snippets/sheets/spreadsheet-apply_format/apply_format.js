/**
 * @file Apply format for Range, Sheet, Spreadsheet
 * @see {@link https://www.facebook.com/groups/spreadsheets/permalink/608833573197952/}
 */

/**
 * Format active range
 */
function runFormatActiveRange() {
  var range = SpreadsheetApp.getActiveRange();
  applyFormat_(range);
}

/**
 * Format active sheet
 */
function runFormatActiveSheet() {
  var range = SpreadsheetApp.getActiveSheet().getDataRange();
  applyFormat_(range);
}

/**
 * Format active book
 */
function runFormatActiveSpreadsheet() {
  SpreadsheetApp.getActive()
    .getSheets()
    .forEach(function (sheet) {
      applyFormat_(sheet.getDataRange());
    });
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 */
function applyFormat_(range) {
  range.setVerticalAlignment('middle').setFontFamily('Calibri');
}
