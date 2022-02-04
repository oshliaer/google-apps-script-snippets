/**
 * @file webpack.config.js
 * @author Alex Ivanov
 * @email ai@contributor.pw
 *
 * The snippet processes the list of sheets of the spreadsheet.
 * It protects the sheets.
 * It excludes ranges from protection if there is the specific list.
 *
 * Protection of multiple sheets
 *
 */

const SHEET_LIST = ['Sheet1', 'Sheet2', 'Sheet3', 'Sheet23'];
const UNPROTECTED_ADDRS = ['A1:C9'];

/**
 * Runs the snippet
 */
function userActionRunSnippet() {
  const book = SpreadsheetApp.getActive();
  const sheets = book.getSheets().filter((sheet) => SHEET_LIST.includes(sheet.getName()));

  sheets.forEach((sheet) => {
    const unprotected = UNPROTECTED_ADDRS.map((addr) => sheet.getRange(addr));
    protect_(sheet, unprotected);
  });
}

/**
 * Protects the sheet
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {Array.<GoogleAppsScript.Spreadsheet.Range>}
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function protect_(sheet, unprotected = []) {
  const protection = sheet.protect().setDescription('Auto protection');
  if (unprotected.length) protection.setUnprotectedRanges(unprotected);
  var me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) protection.setDomainEdit(false);
  return sheet;
}
