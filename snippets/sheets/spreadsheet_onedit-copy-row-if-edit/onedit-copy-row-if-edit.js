/**
 * @file Copy row to new cell when date value changes
 * {@link https://support.google.com/docs/thread/13191603}
 */

/**
 * Runs the snippet.
 * Please, register this function for EDIT event
 * once from the owner of the Spreadsheet http://bit.ly/createedittrigger
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onedit(e) {
  if (!e) return;
  var currentRange = e.range;
  var currentSheet = currentRange.getSheet();
  var currentRow = currentRange.getRow();
  if (e.value && currentSheet.getName() == 'Sheet 1' && currentRow > 1 && currentRange.getColumn() == 1) {
    var dataRange = currentSheet.getRange(currentRow + ':' + currentRow);
    var destinationSheet = currentSheet.getParent().getSheetByName('Sheet 2');
    var destinationRow = destinationSheet.getLastRow() + 1;
    dataRange.copyTo(destinationSheet.getRange(destinationRow, 1), {
      contentsOnly: true,
    });
  }
}
