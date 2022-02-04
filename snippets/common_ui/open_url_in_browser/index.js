/**
 * @file
 * @url https://twitter.com/oshliaer/status/1252620823724281862
 */

/**
 * Create menu
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('My tools')
    .addItem('Open my Sheet in a new tab', 'userActionOpenMyFile')
    .addItem('Open the url from active cell in a new tab', 'userActionOpenUrl')
    .addToUi();
}

/**
 * User action
 */
function userActionOpenMyFile() {
  const file = DriveApp.getFileById('17mpcNilHA43kWqYm8qHAwiwAqFJ1DQ9QENBXHa6CoDM');
  openUrlInBrowser_(file.getUrl());
}

/**
 * User action
 */
function userActionOpenUrl() {
  const url = SpreadsheetApp.getCurrentCell().getValue();
  openUrlInBrowser_(url);
}

/**
 * Open the url in a new tab
 * @param {string} url
 */
function openUrlInBrowser_(url) {
  const tmp = HtmlService.createTemplateFromFile('app');
  tmp.url = url;
  const htmlOutput = tmp.evaluate();
  SpreadsheetApp.getUi().showModelessDialog(htmlOutput, 'Opening url ...');
}
