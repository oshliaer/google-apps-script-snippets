/* exported run */

/**
 * Runs the example
 * @ignore
 */
function run() {
  // https://people.sc.fsu.edu/~jburkardt/data/csv/csv.html
  const file = saveFileFromUrl_('https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv');
  console.log(file.getName());
}

/**
 *
 * @param {string} url
 * @return {GoogleAppsScript.Drive.File}
 */
function saveFileFromUrl_(url) {
  const blob = UrlFetchApp.fetch(url).getBlob();
  return DriveApp.createFile(blob);
}
