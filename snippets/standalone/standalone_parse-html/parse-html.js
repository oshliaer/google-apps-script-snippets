/**
 * @file Parse a html to the value
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  var content = UrlFetchApp.fetch('https://ru.wikipedia.org/wiki/Россия').getContentText();

  var data = parseHtmlToValue_(content);

  Logger.log(JSON.stringify(data));

  /*
    // You can also past the data to a spreadsheet

    SpreadsheetApp.openById('XXX')
    .getSheets()[0]
    .clearContents()
    .getRange(1, 1
    .setValue(data);
  */
}

/**
 * Parses the html content
 *
 * @param {string} content A html string
 * @return {object}
 */
function parseHtmlToValue_(content) {
  var content_ = content.replace(/[\n\r]/g, ' ').replace(/\s+/g, ' ');

  var res = {};

  var match = content_.match(/<h1.*?id="firstHeading".*?>(.*?)<\/h1>/i);
  res['firstHeading'] = {
    match: match,
    value: match && match.length ? match[1] : '',
  };

  return res;
}
