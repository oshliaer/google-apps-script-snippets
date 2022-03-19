/**
 * @file
 * Examples of the snippet
 * {@link https://ru.stackoverflow.com/questions/1390624}
 */

/**
 *
 * @function
 * @name splitDataByConditional_
 *
 * @param {Sheet} sheet - Represents the Sheet that is changing.
 * @param {conditionCallback} condition - The callback that should return true/false state for each row.
 * @returns {{positive: any[][], negative: any[][]}}
 **/
function splitDataByConditional_(sheet, condition) {
  return sheet
    .getDataRange()
    .getValues()
    .reduce(
      (acc, row, i, arr) => {
        if (condition(row, i, arr)) acc.positive.push(row);
        else acc.negative.push(row);
        return acc;
      },
      { positive: [], negative: [] }
    );
}

/**
 * Returns true/false state for each row.
 *
 * @callback conditionCallback
 * @param {any[]} array
 * @param {number} index
 * @param {any[][]} index
 * @return {boolean}
 **/

function run() {
  const from = SpreadsheetApp.getActive().getSheetByName('РФ');
  const to = SpreadsheetApp.getActive().getSheetByName('РФ адвокат');

  const condition = (row, i) => i > 0 && /двокат/.test(row.join(' '));

  const data = splitDataByConditional_(from, condition);

  from.clearContents().getRange(1, 1, data.negative.length, data.negative[0].length).setValues(data.negative);
  to.getRange(to.getLastRow() + 1, 1, data.positive.length, data.positive[0].length).setValues(data.positive);
}
