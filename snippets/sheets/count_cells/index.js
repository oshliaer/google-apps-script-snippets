/**
 * @file
 * @see
 * {@link https://support.google.com/docs/thread/37070239}
 */

/**
 *
 * @param {Array.<Array.<object>>} array
 * @param {ReduceCallback} reduceCallback
 *
 */
function getCountCells_(array, reduceCallback) {
  return array.reduce(reduceCallback, { count: 0, total: 0 });
}

/**
 *
 * @param {Array.<Array.<object>>} array
 * @param {FilterCallback} filterCallback
 *
 */
function getCountCells2_(array, filterCallback) {
  return array.reduce(
    (acc, cv) => {
      const length = cv.length;
      const count = cv.filter(filterCallback).length;
      acc.count += count;
      acc.total += length;
      return acc;
    },
    { count: 0, total: 0 }
  );
}

/**
 * Creates an ueser menu for the snippet
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('My tools')
    .addItem('Get count empty cells of active range', 'userActionGetCountEmptyCells')
    .addItem('Get count non-empty cells of B:B range', 'userActionGetCountNonEmptyCells')
    .addItem('Get count white cells of active range', 'userActionGetCountWhiteCells')
    .addToUi();
}
/**
 * User action
 */
function userActionGetCountEmptyCells() {
  /** @type {ReduceCallback} */
  const reduceCallback = (acc, cv) => {
    const length = cv.length;
    const count = cv.filter((cell) => cell === '').length;
    acc.count += count;
    acc.total += length;
    return acc;
  };
  const countCells = getCountCells_(SpreadsheetApp.getActiveRange().getValues(), reduceCallback);
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Count cells',
    `Empty: ${countCells.count}. With values: ${countCells.total - countCells.count}. Total: ${countCells.total}`,
    ui.ButtonSet.OK
  );
}

/**
 * User action
 */
function userActionGetCountWhiteCells() {
  /** @type {ReduceCallback} */
  const filterCallback = (cell) => cell === '#ffffff';
  const countCells = getCountCells2_(SpreadsheetApp.getActiveRange().getBackgrounds(), filterCallback);
  const ui = SpreadsheetApp.getUi();
  ui.alert('Count cells', `White: ${countCells.count}. Total: ${countCells.total}`, ui.ButtonSet.OK);
}

/**
 * User action
 */
function userActionGetCountNonEmptyCells() {
  /** @type {ReduceCallback} */
  const filterCallback = (cell) => cell !== '';
  const sheet = SpreadsheetApp.getActive().getSheetByName('Sheet1');
  const countCells = getCountCells2_(sheet.getRange(`B1:B${sheet.getLastRow()}`).getValues(), filterCallback);
  const ui = SpreadsheetApp.getUi();
  ui.alert('Count cells', `Non-empty: ${countCells.count}. Total: ${countCells.total}`, ui.ButtonSet.OK);
}

/**
 * This callback is displayed as a global member.
 * @callback ReduceCallback
 * @param {{
     count: 0,
     total: 0
   }} accumulator
 * @param {Array.<object>} currentValue
 * @param {number} index
 * @param {Array.<Array.<object>>} array
 * @return {{
     count: 0,
     total: 0
   }}
 */

/**
 * This callback is displayed as a global member.
 * @callback FilterCallback
 * @param {object} cell
 * @param {number} index
 * @param {Array.<Array.<object>>} array
 * @return {Boolean}
 */
