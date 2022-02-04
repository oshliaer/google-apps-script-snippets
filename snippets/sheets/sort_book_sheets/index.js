/**
 * @file
 * @see {@link https://ru.stackoverflow.com/q/1235759/178725}
 */

/**
 * User action
 */
function userActionSortBookByABC() {
  const book = SpreadsheetApp.getActive();
  sortBookBySheetsList_(book);
}

/**
 * User action
 */
function userActionSortBookByListNames() {
  const sheetsIdts = ['л5', 'л2', 'л4'];
  const counter = (() => {
    let next = 999;
    const self = {};
    return {
      items: self,
      getId: (prop) => {
        if (!Object.prototype.hasOwnProperty.call(self, prop)) self[prop] = ++next;
        return self[prop];
      },
    };
  })();
  const sortcb = (a, b) => {
    const nameA = a.getSheetName();
    const nameB = b.getSheetName();
    let idtA = sheetsIdts.indexOf(nameA);
    let idtB = sheetsIdts.indexOf(nameB);
    if (idtA === -1) idtA = counter.getId(nameA);
    if (idtB === -1) idtB = counter.getId(nameB);
    if (idtA > idtB) return 1;
    if (idtA < idtB) return -1;
    return 0;
  };
  const book = SpreadsheetApp.getActive();
  sortBookBySheetsList_(book, sortcb);
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} book
 * @param {sortCallback} sortfn
 */
function sortBookBySheetsList_(book, sortfn = sortDefault_) {
  const sheets = book.getSheets();
  const sorted = [...sheets].sort(sortfn);
  if (!sheets.every((value, index) => value === sorted[index]))
    sorted
      .map((sheet, i) => {
        return {
          sheet,
          i,
          current: sheets.indexOf(sheet),
        };
      })
      .forEach((item, i, arr) => {
        if (item.i !== item.current) {
          item.sheet.activate();
          book.moveActiveSheet(item.i + 1);
          const prev = item.current;
          item.current = item.i;
          arr.forEach((item_, j) => {
            if (j > item.i && j <= prev) item_.current = item_.current + 1;
          });
        }
      });
}

/**
 * Sort callback
 * @callback sortCallback
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetA
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheetB
 * @returns {(-1|0|1)}
 */

const sortDefault_ = (a, b) => {
  const sA = a.getSheetName().toLowerCase();
  const sB = b.getSheetName().toLowerCase();
  if (sA < sB) return -1;
  if (sA > sB) return 1;
  return 0;
};
