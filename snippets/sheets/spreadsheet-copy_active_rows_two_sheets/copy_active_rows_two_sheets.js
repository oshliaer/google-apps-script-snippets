/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Custom menu').addItem('Copy to logs', 'userActionsCopyToLogs').addToUi();
}

/**
 *
 */
function userActionsCopyToLogs() {
  var headers = ['Name', 'Number'];

  var from = SpreadsheetApp.getActiveSheet();

  if (from.getName() !== 'Sheet1') {
    SpreadsheetApp.getActive().toast('Activate a range on "Sheet1"');
    return;
  }

  var fromValues = from.getDataRange().getValues();

  var fromHeaders = fromValues[0].map(function (h) {
    return headers.indexOf(h);
  });

  var activeRange = SpreadsheetApp.getActiveRange();
  var rowStart = activeRange.getRow();
  var rowEnd = activeRange.getLastRow();
  var fromData = fromValues
    .filter(function (row, i) {
      return i >= rowStart - 1 && i <= rowEnd - 1;
    })
    .map(function (row) {
      return row.filter(function (_, j) {
        return fromHeaders[j] > -1;
      });
    });

  var to = SpreadsheetApp.getActive().getSheetByName('Logs') || SpreadsheetApp.getActive().insertSheet('Logs');

  to.getRange(to.getLastRow() + 1, 1, fromData.length, fromData[0].length)
    .setValues(fromData)
    .activate();
}
