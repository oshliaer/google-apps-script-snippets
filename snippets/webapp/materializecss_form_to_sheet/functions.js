/**
 *
 */
function getCourseCode() {
  var url = 'https://docs.google.com/spreadsheets/d/19GRd3EarV_SM3Y8MYdpWvQNYZVZgLZih4EO4gX_JSko/edit?usp=sharing';
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName('course codes');
  var data = ws.getRange(1, 1).getDataRegion().getValues();
  // Logger.log(data);

  var courseOptions = {};

  data.forEach(function (value) {
    courseOptions[value[0]] = null;
  });
  // Logger.log(data);
  return courseOptions;
}

/**
 *
 * @param {*} code
 */
function getExpectations2(code) {
  var patt = new RegExp(code.slice(0, 5), 'i');
  var data = SpreadsheetApp.openById('1evNXXgFITrdNwsSdGXmprgzti74AQy03dg0igP5nT0I')
    .getSheetByName('expectations')
    .getDataRange()
    .getValues();
  var colIndex = data[0].reduce(function (p, c, i) {
    return patt.test(c) ? i : p;
  }, -1);
  return colIndex === -1
    ? []
    : data
        .slice(1)
        .filter(function (row) {
          return row[colIndex] !== '';
        })
        .map(function (row) {
          return row[colIndex];
        });
}

/**
 *
 * @param {*} index
 */
function getColumnValues(index) {
  var url = 'https://docs.google.com/spreadsheets/d/19GRd3EarV_SM3Y8MYdpWvQNYZVZgLZih4EO4gX_JSko/edit?usp=sharing';
  var ss = SpreadsheetApp.openByUrl(url).getSheetByName('expectations');

  var colIndex = getColumnIndex(index);
  var numRows = ss.getLastRow() - 1;

  var colValues = ss.getRange(2, colIndex, numRows, 1).getValues();
  // Logger.log(colValues);
  return colValues;
}

/**
 *
 * @param {*} label
 */
function getColumnIndex(label) {
  var url = 'https://docs.google.com/spreadsheets/d/19GRd3EarV_SM3Y8MYdpWvQNYZVZgLZih4EO4gX_JSko/edit?usp=sharing';
  var ss = SpreadsheetApp.openByUrl(url).getSheetByName('expectations');

  var lc = ss.getLastColumn();
  var lookupRangeValues = ss.getRange(1, 1, 1, lc).getValues()[0];
  // Logger.log(lookupRangeValues);

  var index = lookupRangeValues.indexOf(label) + 1;

  return index;
}

/**
 *
 */
function getDate() {
  var date = new Date();
  return date.toISOString().slice(0, 10);
}
