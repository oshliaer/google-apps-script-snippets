/**
 * Returns Sheets datetime number from date of F5 cell
 * @customfunction
 */
function GETSHEETDATETIMENUMBER() {
  return toGoogleSheetsDateNumber(SpreadsheetApp.getActiveSheet().getRange('F5').getValue());
}
