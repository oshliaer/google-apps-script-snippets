/**
 * @file
 * @see {@link https://support.google.com/docs/thread/38835811}
 */

/**
 *
 */
function copyData_() {
  const book = SpreadsheetApp.getActive();
  const data = book
    .getRange('Sheet2!E:F')
    .getValues()
    .filter((row) => row.some((cell) => cell !== ''));
  const target = book.getSheetByName('Sheet1');
  const targetData = target.getRange('A:B').getValues();
  const lastRow = targetData.length - targetData.reverse().findIndex((row) => row.some((cell) => cell !== ''));
  if (data.length) target.getRange(lastRow + 1, 1, data.length, data[0].length).setValues(data);
}
