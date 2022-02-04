/**
 * @file Adds autoincrement an a menu
 * @url https://stackoverflow.com/questions/58405672/optimizing-google-app-script-for-implementing-auto-increment-columns
 */

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
function autoincrement_(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;
  var indexCol = data[0].indexOf('autoincrement');
  if (indexCol < 0) return;
  var increment = data.map(function (row) {
    return row[indexCol];
  });
  var lastIncrement = Math.max.apply(
    null,
    increment.filter(function (e) {
      return isNumeric_(e);
    })
  );

  lastIncrement = isNumeric_(lastIncrement) ? lastIncrement : 0;
  var newIncrement = data
    .map(function (row) {
      if (row[indexCol] !== '') return [row[indexCol]];
      if (row.join('').length > 0) return [++lastIncrement];
      return [''];
    })
    .slice(1);
  sheet.getRange(2, indexCol + 1, newIncrement.length).setValues(newIncrement);
}

/**
 * If you need track EDIT event
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  afterEvent_(e);
}

/**
 * If you need track FORM_SUBMIT event
 * @param {GoogleAppsScript.Events.FormsOnSubmit} e
 */
function onformsubmit(e) {
  afterEvent_(e);
}
/**
 *
 * @param {*} e
 */
function afterEvent_(e) {
  try {
    var lock = LockService.getScriptLock();
    if (lock.tryLock(0)) {
      autoincrement_(e.range.getSheet());
      lock.releaseLock();
    }
  } catch (error) {
    e.source.toast(error, 'error', 0);
  }
}

/**
 *
 */
function userActionUpdateIncrement() {
  afterEvent_({
    range: SpreadsheetApp.getActiveRange(),
    source: SpreadsheetApp.getActive(),
  });
}

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('AUTOINCREMENT').addItem('Update', 'userActionUpdateIncrement').addToUi();
}

/**
 *
 * @param {any} n
 * @return {boolean}
 */
function isNumeric_(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
