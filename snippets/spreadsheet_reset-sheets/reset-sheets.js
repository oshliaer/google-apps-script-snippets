/**
 * @file A snippet for .
 * Examples of the snippet {@link https://support.google.com/docs/thread/5809954?msgid=5809954}
 */

/**
 * Runs the snippet.
 * Removes rows by condition 'B:B=10'.
 * @ignore
 */
function run() {
  var sheet = SpreadsheetApp.getActiveSheet();
  deleteRowsByConditional_(sheet, function(row) {
    return row[1] === 10;
  });
}

/**
 * Runs the snippet.
 * Removes rows by condition 'B:B=10'. Appends deleted rows to the 'Archive' sheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Reset sheet')
    .addItem(
      'Reset active sheet (ContactPrice example)',
      'userActionResetActiveSheetByRangesAddresses'
    )
    .addItem('Reset ranges', 'userActionResetRangesByRangesAddresses')
    .addItem(
      'Reset multiple sheets',
      'userActionResetMultipleSheetsByRangesAddresses'
    )
    .addItem(
      'Reset "GSM" columns',
      'userActionResetMultipleSheetsBySpecialColumns'
    )
    .addToUi();
}

/**
 * Clear specifing cells on the active sheet
 */
function userActionResetActiveSheetByRangesAddresses() {
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== 'ContactPrice') return;
  var rangesAddressesList = ['B5', 'B7', 'B9', 'B11', 'B15', 'B19'];
  resetByRangesList_(sheet, rangesAddressesList);
}

/**
 * Clear specifing ranges
 */
function userActionResetRangesByRangesAddresses() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Reset ranges example');
  sheet.activate();
  var rangesAddressesList = ['B5:B15', 'B19'];
  resetByRangesList_(sheet, rangesAddressesList);
}

/**
 * Clear specifing sheets
 */
function userActionResetMultipleSheetsByRangesAddresses() {
  var sheetNames = [
    { name: 'Sheet1', rangesAddressesList: ['B5:B15', 'B19'] },
    { name: 'Sheet2', rangesAddressesList: ['A1:Z20'] },
  ];
  sheetNames.forEach(function(sn) {
    var sheet = SpreadsheetApp.getActive().getSheetByName(sn.name);
    if (sheet) {
      resetByRangesList_(sheet, sn.rangesAddressesList);
    }
  });
}

/**
 * Clear specifing sheets by color
 */
function userActionResetMultipleSheetsByColor() {
  var fColor = '#fa7d00';
  var sheetNames = [
    // { name: 'Sheet1' },
    { name: 'Reset by color (click the image)' },
  ];
  sheetNames.forEach(function(sn) {
    var sheet = SpreadsheetApp.getActive().getSheetByName(sn.name);
    if (sheet) {
      var rangesAddressesList = [];
      sheet
        .getDataRange()
        .getFontColors()
        .forEach(function(row, i) {
          row.forEach(function(color, j) {
            if (color === fColor)
              rangesAddressesList.push(Utilities.formatString('R%sC%s', i + 1, j + 1));
          });
        });
      if (rangesAddressesList.length)
        resetByRangesList_(sheet, rangesAddressesList);
    }
  });
}

/**
 * Cleaning the sheet and special columns
 */
function userActionResetMultipleSheetsBySpecialColumns() {
  SpreadsheetApp.getActive()
    .getSheets()
    .forEach(function(sheet) {
      var lastRow = sheet.getLastRow();
      var rangesAddressesList = [];
      sheet
        .getRange('2:2')
        .getValues()[0]
        .forEach(function(cell, i) {
          if (cell === 'GSA')
            rangesAddressesList.push(
              Utilities.formatString('R3C%s:R%sC%s', i + 1, lastRow, i + 1)
            );
        });
      if (rangesAddressesList.length) {
        sheet.activate(); // Please remove this
        resetByRangesList_(sheet, rangesAddressesList);
      }
    });
}

/**
 * Clear the sheet by the range list
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet
 * @param {Array.<string>} rangesAddressesList The list of ranges to return, as specified in A1 notation or R1C1 notation.
 */
function resetByRangesList_(sheet, rangesAddressesList) {
  sheet.getRangeList(rangesAddressesList).clearContent();
}
