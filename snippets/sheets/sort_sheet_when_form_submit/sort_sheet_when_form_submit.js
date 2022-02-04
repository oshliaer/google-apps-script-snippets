/**
 *
 * @file
 * @see
 * {@link https://googleappsscriptrc.blogspot.com/2018/07/form-submit-formatt.html}
 */
/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 */
function onformsubmit(e) {
  const sheet = e.range.getSheet();
  sheet.getRange('1:1').copyTo(sheet.getRange(`${e.range.getRow()}:${e.range.getRow()}`), {
    formatOnly: true,
  });
  const range = sheet.getRange(e.range.getRow(), 4);
  onEdit({
    range: range,
  });
}

/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  const sheet = e.range.getSheet();
  if (e.range.getColumn() === 4 && sheet.getName() === 'Ответы на форму') {
    const rowIndex = sheet
      .getDataRange()
      .getValues()
      .findIndex((row) => row[0] === '');
    const rows = rowIndex === -1 ? sheet.getLastRow() - 1 : rowIndex - 1;
    sheet.getRange(2, 1, rows, sheet.getLastColumn()).sort([
      { column: 4, ascending: true },
      { column: 1, ascending: false },
    ]);
  }
}

/**
 *
 */
function install() {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    if ([ScriptApp.EventType.ON_FORM_SUBMIT, ScriptApp.EventType.ON_EDIT].includes(trigger.getEventType()))
      ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('onformsubmit').forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create();
}
