/**
 * @file
 * {@link}
 */

/**
 * Runs the snippet.
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  if (e.range.getSheet().getName() === 'Sheet1' && e.range.getColumn() === 4 && e.range.getValue() === true)
    e.range.getSheet().getParent().toast('Hi');
}
