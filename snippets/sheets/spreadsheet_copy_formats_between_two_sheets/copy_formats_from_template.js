/**
 * Copy formats from a template to the sheet
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} from Source sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} to Destination sheet
 * @return {undefined}
 */
function copyFormatsBetweenTwoSheets_(from, to) {
  var values = from.getRange('A2:D').getValues();

  to.clearContents();
  to.getRange(3, 3, values.length, values[0].length).setValues(values);
}

/**
 * Example
 */
function example1() {
  var from = SpreadsheetApp.openById('1fAEqgLX2S94qbGEP0cNSOhMb8VLn9Izz59vMbT7VQJU').getSheetByName('MOCK_DATA');
  var to = SpreadsheetApp.openById('1m6XiqqNOvn3kYjU_K6CNqZZ-TkrIyOJhEdJov2VhgiU').getSheetByName('MOCK_DATA');
  copyValuesBetweenTwoSheets_(from, to);
}
