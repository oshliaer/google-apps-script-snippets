/* global deleteRowsByConditional_ */

/**
 * Runs the snippet.
 * Removes rows from an active sheet by condition 'B:B=10'
 */
function run1() {
  const sheet = SpreadsheetApp.getActiveSheet();
  deleteRowsByConditional_(sheet, (values, i) => values[i][1] === 10);
}

/**
 * Runs the snippet.
 * Removes rows by condition '(A:A<>"")*(B:B<>"")*(D:D<>"")*(F:F<>"")'.
 * Appends deleted rows to the 'Archive' sheet.
 *
 * @see https://toster.ru/q/690651
 *
 */
function run2() {
  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() === 'Archive') return;
  const archive = SpreadsheetApp.getActive().getSheetByName('Archive');

  const action = (values, i, i2) => {
    const data = values.slice(i, i + i2);
    archive.getRange(archive.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);
  };

  const condition = (values, i) => {
    const row = values[i];
    return i > 0 && row[0] !== '' && row[1] !== '' && row[3] !== '' && row[5] !== '';
  };

  deleteRowsByConditional_(sheet, condition, action);
}
