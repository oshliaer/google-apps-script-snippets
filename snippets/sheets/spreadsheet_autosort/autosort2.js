/**
 *
 * {@link https://www.facebook.com/groups/googleappsscript/permalink/524114248138136/ }
 */

/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} event
 */
function onEditAutosort2(event) {
  var sheet = event.range.getSheet();
  if (sheet.getName() !== 'autosort2' || event.range.getColumn() !== 2) return;

  sheet.getRange('B3:G150').sort(2).activate();
  SpreadsheetApp.getActive().toast('Done');
}
// /**
//  *
//  * @param {GoogleAppsScript.Spreadsheet.Range} range1
//  * @param {GoogleAppsScript.Spreadsheet.Range} range2
//  */
// function intersectionOfRanges_(range1, range2) {
//   return !(
//     range2.getColumn() > range1.getLastColumn() ||
//     range2.getLastColumn() < range1.getColumn() ||
//     range2.getRow() > range1.getLastRow() ||
//     range2.getLastRow() < range1.getRow()
//   );
// }
