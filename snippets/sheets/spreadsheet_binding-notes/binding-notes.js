/**
 * @file Updates notes in the second column if there have been edits in the first one.
 * @url https://stackoverflow.com/questions/58685598/set-dependent-notes-in-google-sheets
 */

/**
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  if (e.range.getColumn() === 1) e.range.offset(0, 1).setNotes(e.range.getValues());
}
