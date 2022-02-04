/**
 *
 * @param {GoogleAppsScript.Events.DoGet} e
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('client/index');
}

/**
 * @param {GoogleAppsScript.Events.DoPost}
 */
function doPost(e) {
  return ContentService.createTextOutput(JSON.stringify({ date: new Date().toLocaleTimeString('ru') }));
}
