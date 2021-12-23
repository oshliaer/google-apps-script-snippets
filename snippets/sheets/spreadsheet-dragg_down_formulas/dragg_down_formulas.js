/**
 * @file Dragg down a formula
 * @url https://qna.habr.com/q/709715
 * */

/**
 * User action. Runs the snippet
 */
function run() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const base = sheet.getRange('I3:I');
  const colFormula = sheet.getRange('J3');
  draggDownFormulas_(base, colFormula);
}

function runBulk() {
  const formulasCells = ['J3', 'K3', 'M3'];
  const sheet = SpreadsheetApp.getActiveSheet();
  const base = sheet.getRange('I3:I');
  formulasCells.forEach((cell) => {
    const colFormula = sheet.getRange(cell);
    draggDownFormulas_(base, colFormula);
  });
}

/**
 * User action. Runs the snippet
 */
function run2() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const base = sheet.getRange('J3:J');
  const colFormula = sheet.getRange('J3');
  draggDownOneFormula_(base, colFormula);
}

/**
 * @param {GoogleAppsScript.Spreadsheet.Range} base
 * @param {GoogleAppsScript.Spreadsheet.Range} colFormula
 */
function draggDownFormulas_(base, colFormula) {
  const baseValues = base.getValues();
  const lastBase =
    baseValues.length - baseValues.reverse().findIndex((row) => row[0] !== '');
  const colFormulaFormula = colFormula.getFormula();
  colFormula
    .getSheet()
    .getRange(base.getRow(), colFormula.getColumn(), lastBase)
    .setFormula(colFormulaFormula);
}

/**
 * Add the formula down
 * @url https://qna.habr.com/q/709413
 * */

/**
 * @param {GoogleAppsScript.Spreadsheet.Range} base
 * @param {GoogleAppsScript.Spreadsheet.Range} colFormula
 */
function draggDownOneFormula_(base, colFormula) {
  const baseValues = base.getValues();
  const lastBase =
    baseValues.length - baseValues.reverse().findIndex((row) => row[0] !== '');
  const colFormulaFormula = colFormula.getFormula();
  colFormula
    .getSheet()
    .getRange(base.getRow(), colFormula.getColumn(), lastBase + 1)
    .setFormula(colFormulaFormula);
}
