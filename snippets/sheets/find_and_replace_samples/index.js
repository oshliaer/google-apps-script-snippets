/**
 * Clearing  all data with 'http' text
 */
function run() {
  const book = SpreadsheetApp.getActive();
  const text = 'http';
  const clearedRangeLists = findAndReplace_(book, text);
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} book
 * @param {string} expression
 * @param {string} replacement
 * @param {callbackSheetValidator_}
 * @return {Array.<GoogleAppsScript.Spreadsheet.RangeList>}
 */
function findAndReplace_(book, expr, repl, excl) {
  const textFinder = book.createTextFinder(text);
  const rangers = textFinder.findAll();
  const a1NotationsGroups = rangers.reduce((groups, range) => {
    const sheetName = range.getSheet().getName();
    if (!groups[sheetName]) groups[sheetName] = [];
    groups[sheetName].push(`${range.getA1Notation()}`);
    return groups;
  }, {});
  return Object.keys(a1NotationsGroups).map((sheetName) =>
    book.getSheetByName(sheetName).getRangeList(a1NotationsGroups[sheetName]).clearContent()
  );
}

/**
 *
 */
function callbackSheetValidator_() {
  return true;
}
