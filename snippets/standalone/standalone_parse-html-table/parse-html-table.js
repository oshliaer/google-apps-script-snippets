/**
 * @file Parse a html table to the array
 * @url https://stackoverflow.com/questions/57261523
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  var content = UrlFetchApp.fetch(
    'https://www.codelco.com/prontus_codelco/site/edic/base/port/licitaciones_enproceso.html'
  ).getContentText();

  var data = parseHtmlTableToArray_(content);

  Logger.log(JSON.stringify(data));

  /*
    // You can also past the data to a spreadsheet

    SpreadsheetApp.openById('XXX')
    .getSheets()[0]
    .clearContents()
    .getRange(1, 1, data.length, data[0].length)
    .setValues(data);
  */
}

/**
 * Placeholder
 * @type {string}
 */
var PLACEHOLDER = '-- Better email me: oshli.a.er@gmail.com --';

/**
 * Parses the first html-table from the content. max 7 columns
 *
 * @param {string} content A html string
 * @return {Array.<Array.<object>>}
 */
function parseHtmlTableToArray_(content) {
  var inline = content.replace(/[\n\r]/g, ' ');
  var table = inline.split(/<table.*?>/)[1].split(/<\/table>/)[0];

  return table.split(/<tr.*?>/).map(function (row) {
    return (
      row
        .split(/(<td.*?>|<th.*?>)/)
        .slice(2)
        .reduce(function (p, cell, i) {
          if (~i % 2) {
            p.push(cell.replace(/<.*?>/g, ' ').replace(/\s+/g, ' ').replace(/^\s+/g, '').replace(/\s+$/g, ''));
          }
          return p;
        }, [])
        .join(PLACEHOLDER) + PLACEHOLDER.repeat(7)
    )
      .split(PLACEHOLDER)
      .slice(0, 7);
  });
}
