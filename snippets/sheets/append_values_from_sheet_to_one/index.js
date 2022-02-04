/**
 * @file
 * @see
 * {@link https://ru.stackoverflow.com/questions/1110863}
 */

/**
 * Append values from to
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} from
 * @param {GoogleAppsScript.Spreadsheet.Sheet} to
 * @return {number} Count of rows
 */
function appendValues_(from, to) {
  const fromRange = from.getRange('A2:C');
  const fromValues = fromRange.getValues().filter((row) => row.some((cell) => cell !== ''));
  if (fromValues.length)
    to.getRange(to.getLastRow() + 1, 2, fromValues.length, fromValues[0].length).setValues(fromValues);
  fromRange.clearContent();
  return fromValues.length;
}

/**
 * Creates an ueser menu for the snippet
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('My tools').addItem('Copy data', 'userActionCopyData').addToUi();
}
/**
 * User action
 */
function userActionCopyData() {
  const from = SpreadsheetApp.getActiveSheet();
  if (from.getName() !== 'Лист 1') {
    SpreadsheetApp.getActive().toast('Выберите нужный лист');
    return;
  }
  const to = SpreadsheetApp.getActive().getSheetByName('Лист 2');
  const rows = appendValues_(from, to);
  SpreadsheetApp.getActive().toast(`Добавлено ${rows} строк`);
}
