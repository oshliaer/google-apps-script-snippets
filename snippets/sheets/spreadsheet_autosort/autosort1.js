/**
 * https://stackoverflow.com/questions/58723024/auto-sort-data-moved-by-script
 */
function autoSortOnEdit_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Completed Returns');
  if (!sheet) return;
  var range = sheet.getRange(4, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  range.sort({ column: 2, ascending: true });
}

/**
 * This is some additional function
 */
function copyData_() {}

/**
 *
 */
function onEditAutosort1() {
  copyData_();
  autoSortOnEdit_();
}
