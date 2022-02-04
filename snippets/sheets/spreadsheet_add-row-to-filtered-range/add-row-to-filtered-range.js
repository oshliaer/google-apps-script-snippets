/**
 * @file
 * @url
 */

/**
 *
 */
function run() {
  var sheet = SpreadsheetApp.getActiveSheet();

  sheet.insertRowBefore(4);
}

/**
 * Filter Criterias Collection
 * @typedef {object} FilterCriteriaCollection
 * @property {GoogleAppsScript.Spreadsheet.FilterCriteria[]} criterias
 * @property {Object.<string>} sdfg
 */

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
function FilterCriteriasStash(sheet) {
  var filter = sheet.getFilter();
  var range = filter.getRange();
  var slip = range.getColumn() - 1;
  var values = filter.getRange().getValues();
  // var columns =
  var headers = values.slice(0, 1)[0];
  var criterias = headers.map(function (header, i) {
    return {
      header: header,
      index: i,
      criteria: filter.getColumnFilterCriteria(i + 1),
    };
  });
  this.getCriterias = function () {
    return criterias;
  };
  this.getSlip = function () {
    return slip;
  };
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @param {number} slip
 */
FilterCriteriasStash.prototype.apply = function (range, slip) {
  slip = slip || 0;
  var filter = range.newFilter();
  var criterias = this.getCriterias();
  var values = filter.getRange().getValues();
  var headers = values.slice(0, 1)[0];
};

var firstCopyCol = 3;
var numColCopy = 2;
var noteTypeCol = 2;
var sheet = SpreadsheetApp.getActiveSheet();
var sheetName = 'MatchImport';

/**
 *
 */
function addNewCueNote() {
  if (sheet.getSheetName() === sheetName) {
    var filter = sheet.getFilter();
    if (filter) {
      var dataRange = sheet.getDataRange();
      var oldNumColumns = filter.getRange().getNumColumns();
      var newNumColumns = dataRange.getNumColumns();
      var criterias = {};
      for (var c = 1; c <= oldNumColumns && c <= newNumColumns; c++) {
        var criteria = filter.getColumnFilterCriteria(c);
        if (criteria) criterias['_' + c] = criteria;
      }
      filter.remove();
    }

    // START OF YOUR INSERT LOGIC
    var noteType = 'CUE';

    // ADDS ROW AND COPIES FORMULA DOWN
    // SETS VARIABLES FOR LAST ROW AND LAST COLUMN
    var lRow = sheet.getLastRow();
    var lCol = sheet.getLastColumn(); // This is never used
    // INSERT LAST ROW
    sheet.insertRowsAfter(lRow, 1);

    // COPY FORMULAS DOWN FOR SPECIFIED COLUMNS

    sheet.getRange(lRow, firstCopyCol, 1, numColCopy).copyTo(sheet.getRange(lRow + 1, firstCopyCol, 1, numColCopy));

    // SETS NOTE TYPE
    sheet.getRange(sheet.getLastRow(), noteTypeCol).setValue(noteType);

    //* * END OF YOUR INSERT LOGIC

    if (!filter) return;
    dataRange = sheet.getDataRange();
    var newFilter = dataRange.createFilter();
    newNumColumns = dataRange.getNumColumns();
    for (c = 1; c <= oldNumColumns && c <= newNumColumns; c++) {
      if (criterias['_' + c]) newFilter.setColumnFilterCriteria(c, criterias['_' + c]);
    }
  }
}
