/**
 * @file Simple serch engine
 * @see {@link https://ru.stackoverflow.com/questions/1066230}
 */

/**
 * Run the snippet
 */
function searchInValues() {
  var resultSheetName = 'Search result';
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() === resultSheetName) {
    Logger.log('Activate another sheet');
    return;
  }
  var data = search_(sheet.getDataRange(), /max/i);
  (
    SpreadsheetApp.getActive().getSheetByName('Search result') ||
    SpreadsheetApp.getActive().insertSheet('Search result')
  )
    .clearContents()
    .getRange(1, 1, data.length, data[0].length)
    .setValues(data)
    .activate();
}

/**
 * Run the snippet
 */
function searchInNotes() {
  var resultSheetName = 'Search result';
  var sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() === resultSheetName) {
    Logger.log('Activate another sheet');
    return;
  }
  var data = search_(sheet.getDataRange(), /max/i, 'notes');
  (
    SpreadsheetApp.getActive().getSheetByName('Search result') ||
    SpreadsheetApp.getActive().insertSheet('Search result')
  )
    .clearContents()
    .getRange(1, 1, data.length, data[0].length)
    .setValues(data)
    .activate();
}

/**
 * Enum comands
 * @enum {string}
 */
var SEARCH_CMD = {
  values: 'getValues',
  displayed: 'getDisplayValues',
  notes: 'getNotes',
  backgrounds: 'getBackgrounds',
  colors: 'getFontColors',
  formulas: 'getFormulas',
};

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Range} range range
 * @param {string} query regexp string
 * @param {SEARCH_CMD=} cmd command
 */
function search_(range, query, cmd) {
  var res = [];
  var prefix = '#gid=' + range.getSheet().getSheetId() + '&range=';
  var patt = new RegExp(query);
  var prefixName = Utilities.formatString(
    '%s - %s [%s]: ',
    range.getSheet().getName(),
    cmd || 'values',
    query.toString()
  );

  range[SEARCH_CMD[cmd] ? SEARCH_CMD[cmd] : SEARCH_CMD['values']]().forEach(function (row, r) {
    row.forEach(function (col, c) {
      if (patt.test(col)) {
        var nota = Utilities.formatString('%s%s', c.to26(), r + 1);
        res.push([Utilities.formatString('=HYPERLINK("%s%s";"%s%s")', prefix, nota, prefixName, nota), col]);
      }
    });
  });
  return res;
}

// eslint-disable-next-line no-extend-native
Number.prototype.to26 = function (suffix) {
  suffix = String.fromCharCode((this % 26) + 65) + (suffix || '');
  return this >= 26 ? (Math.floor(this / 26) - 1).to26(suffix) : suffix;
};
