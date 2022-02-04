/* global tocBuilder_ tocUpdater_*/

/**
 * Runs the snippet.
 * Generates a TOC to 'Sheet27!B2' without 'Sheet27' item.
 */
function run() {
  const excludeSheetNames = ['Sheet27'];
  const book = SpreadsheetApp.getActive();
  const tocBuild = tocBuilder_(book).filter((item) => excludeSheetNames.indexOf(item.name) === -1);
  const range = book.getRange('Sheet27!B2:B').clearContent();
  tocUpdater_(tocBuild, range);
  range.activate();
}

/**
 * Create menu for handy use
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Apps Script Snippets').addItem('Generate TOC', 'run').addToUi();
}
