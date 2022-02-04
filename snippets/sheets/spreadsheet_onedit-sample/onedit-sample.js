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
  e.range
    .getSheet()
    .getParent()
    .toast(Utilities.formatString("'%s'!%s", e.range.getSheet().getName(), e.range.getA1Notation()), '', -1);
}
