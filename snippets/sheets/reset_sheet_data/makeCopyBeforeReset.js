/* global resetByRangesList_ */

/**
 * The user action
 */
function userActionMakeCopyBeforeReset() {
  // Don't copy this part. It's just for sample === START
  const __checkvar__ = 'Make copy before reset';
  if (SpreadsheetApp.getActiveSheet().getName() !== __checkvar__) {
    SpreadsheetApp.getActive().getSheetByName(__checkvar__).activate();
    SpreadsheetApp.getUi().alert('OK. The original sheet will activated. Please, fill data and try again!');
    return;
  }
  // ============================================== END

  const book = SpreadsheetApp.getActive();
  const sheet = book.getActiveSheet();
  makeCopyBeforeReset_(sheet, book);
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} book
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function makeCopyBeforeReset_(sheet, book) {
  const copy = sheet.copyTo(book);
  const rangesAddressesList = ['B5', 'B7', 'B9', 'B11'];
  resetByRangesList_(sheet, rangesAddressesList);
  return copy;
}
