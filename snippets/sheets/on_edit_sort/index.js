/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  const sheetName = 'Sheet1'; // name of the sheet the script should work on
  const colToSort = 4; // name of the column should sort on

  if (e && e.range && e.range.getColumn() === colToSort && e.range.getRow() > 1) {
    const sheet = e.range.getSheet();
    if (sheet.getName() == sheetName) sheet.sort(colToSort);
  }
}
