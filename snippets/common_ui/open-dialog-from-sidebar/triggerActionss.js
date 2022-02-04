/**
 * Create menu for handy use
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Apps Script Snippets').addItem('Open sidebar', 'run').addToUi();
}
