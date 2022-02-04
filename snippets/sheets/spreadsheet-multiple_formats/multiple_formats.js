/**
 * @file
 * @url https://stackoverflow.com/questions/59967823/google-sheetsformat-numbers-as-billions-millions-thousands-smartly
 * */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Advanced formatting')
    .addItem('Format active range to "M,K,zeros"', 'userActionFormatToMKZerosActiveRange')
    .addToUi();
}

/**
 *
 */
function userActionFormatToMKZerosActiveRange() {
  formatToMKZeros(SpreadsheetApp.getActiveRange());
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 */
function formatToMKZeros(range) {
  var values = range.getValues();
  return range.setNumberFormats(
    range.getNumberFormats().map(function (row, r) {
      return row.map(function (format, c) {
        return isNumeric(values[r][c])
          ? values[r][c] !== 0 && Math.abs(values[r][c]) < 999950
            ? '[<999950]0.0,"K";[>-999950]0.0,"K"'
            : '[>=999950]0.0,,"M";[<=-999950]0.0,,"M";#,,"-"'
          : format;
      });
    })
  );
}

/**
 *
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
