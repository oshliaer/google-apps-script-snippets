/**
 * @file
 */

/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  e.source.toast('edit', 0);
  try {
    var lock = LockService.getScriptLock();
    e.source.toast('befor lock', 0);
    if (lock.tryLock(0)) {
      Utilities.sleep(1000 * 1);
      e.source.toast('after sleep', 0);
      SpreadsheetApp.flush();
      const sheet = e.range.getSheet();
      const range = sheet.getDataRange();
      const newValues = range.getValues().map((row) => [row[1] === 'Койка без О2' ? false : row[2]]);
      sheet.getRange(1, 3, newValues.length, newValues[0].length).setValues(newValues);
      lock.releaseLock();
      e.source.toast('done', 0);
    } else {
      e.source.toast('ski[p', 0);
    }
  } catch (error) {
    e.source.toast(error, 'error', 0);
  }
}
