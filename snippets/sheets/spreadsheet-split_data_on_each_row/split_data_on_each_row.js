/**
 * @file Split data on each row
 * @see {@link https://groups.google.com/forum/?#!topic/google-apps-script-community/_-rA_JPpIdU}
 */

/**
 * Split data on each row. Splits second column
 */
function splitDataOnEachRow() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  var newValues = [];
  values.forEach(function (row) {
    var lines = row[1].split(/\s*,\s*/);
    lines.forEach(function (item, j) {
      var newRow = [].concat(row);
      newRow[0] += '_' + (j + 1);
      newRow[1] = item;
      newValues.push(newRow);
    });
  });
  newValues.unshift(headers);
  sheet.clearContents().getRange(1, 1, newValues.length, newValues[0].length).setValues(newValues);
}
/**
 * Generates start data for the sample
 */
function generateData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var headers = ['Sequence', 'Name', 'Number'];
  var data = [
    ['s', 'John, Mike, Peter', 1],
    ['s', 'Ben', 51],
    ['s', 'Sonia', 14],
  ];
  data.unshift(headers);
  sheet.clearContents().getRange(1, 1, data.length, data[0].length).setValues(data);
}
