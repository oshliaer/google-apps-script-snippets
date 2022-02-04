/**
 * @file
 * @see
 * {@link https://t.me/googleappsscriptrc}
 */

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('My tools')
    .addItem('Fill data', 'userActionFillData')
    .addItem('Extract data', 'userActionExtractData')
    .addToUi();
}

/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  if (
    e.range.getSheet().getName() === 'Sheet1' &&
    ((e.range.getColumn() === 2 && e.range.getRow() > 3) || e.range.getA1Notation() === 'F6')
  ) {
    SpreadsheetApp.getActive().toast('Start ...');
    fillData_(e.range.getSheet());
  }
}

/**
 *
 */
function userActionFillData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() === 'Sheet1') {
    SpreadsheetApp.getActive().toast('Start ...');
    fillData_(sheet);
  }
}

/**
 *
 */
function userActionExtractData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() === 'Sheet1') {
    SpreadsheetApp.getActive().toast('Start ...');
    extractData_(sheet);
  }
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
function fillData_(sheet) {
  const percent = sheet.getRange('F6').getValue() || 0.1;
  const range = sheet.getRange('B3:C');
  const values = range.getValues();

  const totalData = values.map((_, i) => i).filter((_, i) => values[i][0] !== '');

  const sortIndexes = totalData.sort(() => 0.5 - Math.random()).slice(0, parseInt(totalData.length * percent));

  const newValues = values.map((_, i) => [sortIndexes.indexOf(i) !== -1 ? true : '']);

  sheet.getRange('C3:C').setValues(newValues);
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet}
 */
function extractData_(sheet) {
  const percent = sheet.getRange('F6').getValue() || 0.1;
  const range = sheet.getRange('A3:C');
  const values = range.getValues();

  const totalData = values.filter((row) => row[0] !== '');

  const sortIndexes = totalData.sort(() => 0.5 - Math.random()).slice(0, parseInt(totalData.length * percent));

  sheet
    .getRange('L3:N')
    .clearContent()
    .getSheet()
    .getRange(3, 12, sortIndexes.length, sortIndexes[0].length)
    .setValues(sortIndexes);
}
