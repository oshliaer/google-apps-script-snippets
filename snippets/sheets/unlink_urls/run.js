/* global unlinkUrls_ */

/**
 * Runs the snippet.
 * Unlink URLs
 */
function run() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getDataRange();
  unlinkUrls_(range);
}

/**
 * Create menu for handy use
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Apps Script Snippets').addItem('Unlink all urls on the Sheet', 'run').addToUi();
}
