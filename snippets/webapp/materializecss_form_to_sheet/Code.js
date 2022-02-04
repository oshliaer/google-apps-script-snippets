// these are the parameters when passing a condition/event for doGet
//  {parameter={}, contextPath=, contentLength=-1, queryString=, parameters={}}
// example at end of URL if you add ?name=Joe
// https://script.google.com/a/smcdsb.on.ca/macros/s/AKfycbxbYNcWp7mNCWB01CToH-chLVdJDF1LR1r2pzPcM4c/dev?name=Joe
// results = {parameter={name=Joe}, contextPath=, contentLength=-1, queryString=name=Joe, parameters={name=[Joe]}}

/**
 *
 * @param {*} e
 */
function doGet(e) {
  // Logger.log(e);
  return HtmlService.createTemplateFromFile('page').evaluate();
}

/**
 *
 * @param {*} filename
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 *
 * @param {*} submission
 */
function userClicked(submission) {
  var url = 'https://docs.google.com/spreadsheets/d/19GRd3EarV_SM3Y8MYdpWvQNYZVZgLZih4EO4gX_JSko/edit?usp=sharing';
  var ss = SpreadsheetApp.openByUrl(url);
  Logger.log(submission);
  var ws = ss.getSheetByName('submissions');
  var date = new Date();

  ws.appendRow([date, submission.grade, submission.courseCode, submission.expectations]);
}
