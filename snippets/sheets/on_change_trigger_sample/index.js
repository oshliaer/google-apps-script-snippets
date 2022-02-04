/* "runtimeVersion": "STABLE" */

/**
 * @param {GoogleAppsScript.Events.SheetsOnChange} e
 */
function onChange1(e) {
  const bookId = ScriptApp.getProjectTriggers()
    .find(function (trigger) {
      return trigger.getUniqueId() === e.triggerUid;
    })[0]
    .getTriggerSourceId();
  var book = SpreadsheetApp.openById(bookId);
  console.log(book.getName());
}
