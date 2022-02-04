/**
 * https://stackoverflow.com/questions/58224821
 */

var ss = SpreadsheetApp.openByUrl(
  'https://docs.google.com/spreadsheets/d/1L1Qu6QCaDucr4Jy5eOAnQkX-wpYjz6eevqAMzBc72iQ/edit#gid=0'
);
var sheet = ss.getSheetByName('Sheet1');

/**
 *
 * @param {*} e
 */
function doGet(e) {
  return search(e);
}

/**
 *
 * @param {*} e
 */
function doPost(e) {
  return search(e);
}

/**
 *
 * @param {*} e
 */
function search(e) {
  var id = e.parameter.id;

  var values = sheet
    .getDataRange()
    .getValues()
    .filter(function (row) {
      return row[0] === id;
    });

  var content = JSON.stringify(values);
  return ContentService.createTextOutput(content).setMimeType(ContentService.MimeType.TEXT);
}
