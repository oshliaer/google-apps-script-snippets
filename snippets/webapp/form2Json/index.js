/**
 *
 * @file
 * {@link https://qna.habr.com/q/766259}
 */

/* global form2Json */
/* exported doPost */
/**
 *
 * @param {GoogleAppsScript.Events.DoPost} e
 */
function doPost(e) {
  // const payments = JSON.parse(e.parameter.payments);
  return ContentService.createTextOutput(JSON.stringify(form2Json(e.postData.contents), null, '  '));
}
