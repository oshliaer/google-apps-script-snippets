/**
 * @file
 * @url https://support.google.com/docs/thread/22517479
 */

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Charts').addItem('Show calendar chart', 'userActionShowCalendarChart').addToUi();
}

/**
 *
 */
function userActionShowCalendarChart() {
  var template = HtmlService.createTemplateFromFile('charts_calendar_ui');
  SpreadsheetApp.getUi().showModalDialog(template.evaluate().setWidth(1100).setHeight(450), ' ');
}

/**
 *
 */
function getData() {
  return SpreadsheetApp.getActive()
    .getRange("'Calendar chart'!A:B")
    .getValues()
    .filter(function (row) {
      return row[0] && row[0].getTime;
    })
    .map(function (row) {
      row[0] = row[0].getTime();
      return row;
    });
}
