/**
 * @file
 * {@link}
 */

/**
 * Runs the snippet.
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onedit(e) {
  if (e.range.getRow() < 2) return;
  e.range
    .offset(0, -1 * e.range.getColumn() + 1)
    .setValue(Session.getEffectiveUser().getEmail() + ' ' + Session.getActiveUser().getEmail());
}

/**
 * Runs the snippet.
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  if (e.range.getRow() < 2) return;
  e.range
    .offset(0, -1 * e.range.getColumn() + 2)
    .setValue(Session.getEffectiveUser().getEmail() + ' ' + Session.getActiveUser().getEmail());
}

/**
 * Reset auth
 */
function reset() {
  ScriptApp.invalidateAuth();
}
