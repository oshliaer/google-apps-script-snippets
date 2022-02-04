/**
 * @file
 * @url
 */

/**
 * Create menu
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('My tools').addItem('Show sidebar', 'userActionShowSidebar').addToUi();
}

/**
 * User action
 */
function userActionShowSidebar() {
  const htmlTemplate = HtmlService.createTemplateFromFile('app');
  const htmlOutput = htmlTemplate.evaluate();
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].activate();
}

/**
 *
 */
function getValues() {
  const values = SpreadsheetApp.getActiveSpreadsheet()
    .getSheets()[0]
    .getRange('A:A')
    .getValues()
    .map((row) => row[0])
    .filter((v, i, a) => a.indexOf(v) === i);
  values.shift();
  return values;
}
