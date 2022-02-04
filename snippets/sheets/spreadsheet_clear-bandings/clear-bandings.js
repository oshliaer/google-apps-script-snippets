/**
 * @file Clears all bandings
 * @url https://support.google.com/docs/thread/12818677?msgid=12818677
 * */

/**
 * User action. Runs the snippet
 */
function run() {
  var spreadsheet = SpreadsheetApp.getActive();
  clearBandings_(spreadsheet);
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 */
function clearBandings_(spreadsheet) {
  spreadsheet.getSheets().forEach(function (sheet) {
    sheet.getBandings().forEach(function (banding) {
      banding.remove();
    });
  });
}
