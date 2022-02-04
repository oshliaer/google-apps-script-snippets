/**
 * @file dowload a file from the url to Drive
 * @url https://developer.mozilla.org/en-US/docs/Web/API/URL
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  var url = 'https://admin.singlaapparels.com/Main/fileurl/64F619B8-C2BE-4EDF-BF9B-01FD60C5D957/4/RakeshKumar.jpg';
  var blob = UrlFetchApp.fetch(url).getBlob();
  DriveApp.createFile(blob);
}
