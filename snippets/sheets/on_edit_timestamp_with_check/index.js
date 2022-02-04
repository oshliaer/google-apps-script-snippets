/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  const sheetName = 'Sheet6'; // name of the sheet the script should work on
  const colToStamp = 3; // timestamp in col C

  if (e && e.range && e.range.getColumn() > 1 && e.range.getRow() > 1) {
    const sheet = e.range.getSheet();
    if (sheet.getName() !== sheetName) {
      const writeVal = e.value && sheet.getRange(e.range.getRow(), 1).getValue() == true ? new Date() : '';
      sheet.getRange(e.range.rowStart, colToStamp).setValue(writeVal);
    }
  }
}
