/**
 * @file Colored cell by list value
 * @see {@link https://stackoverflow.com/questions/60235521/change-cell-color-based-on-selection-from-dropdown-menu}
 */

/**
 * Run the snippet as a simple trigger
 */
/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
const onEdit = (e) => {
  const sheet = e.range.getSheet();
  const value = e.range.getValue();
  if (sheet.getName() == 'Sheet1' && e.range.getA1Notation() === 'C2') {
    const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1);
    range.setBackgrounds(range.getValues().map((row) => [row[0] === value ? '#7986CB' : '']));
  }
};
