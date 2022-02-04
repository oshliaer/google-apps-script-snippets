/**
 * @file
 * @see
 * {@link https://support.google.com/docs/thread/36708307}
 */

/**
 * Append a new row with date and time
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @return {GoogleAppsScript.Spreadsheet.Sheet} // The sheet
 */
function appendDateTimeRow_(sheet) {
  const locale = sheet.getParent().getSpreadsheetLocale().split('_')[0];
  return sheet.appendRow([...new Date().toLocaleString(locale).split(/[,\s]+/, 2)]);
}

/**
 * Creates an ueser menu for the snippet
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('My tools').addItem('Add new row', 'userActionAddNewRow').addToUi();
}
/**
 * User action
 */
function userActionAddNewRow() {
  appendDateTimeRow_(SpreadsheetApp.getActiveSheet());
}
