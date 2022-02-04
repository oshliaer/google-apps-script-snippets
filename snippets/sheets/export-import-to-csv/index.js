/**
 * @file Import/Export to CSV
 * @see
 * {@link https://stackoverflow.com/questions/61200664/overwrite-file-google-sheets-script}
 */

/* exported onOpen, 
   userActionImportFromCSV, userActionExportToCSV, 
   batchUpdateSpreadsheet_ */

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CSV')
    .addItem('Import from the file', 'userActionImportFromCSV')
    .addItem('Export to the file', 'userActionExportToCSV')
    .addToUi();
}

var CSV_FILE_ID = '1G9eI5bj_jYQz_a_mk4t5mmLJsgwOpP8q';
// var SHEETID = '0';

/**
 * User action. Import the CSV file
 */
function userActionImportFromCSV() {
  var res = importFromCSV_(
    CSV_FILE_ID,
    SpreadsheetApp.getActive().getId(),
    SpreadsheetApp.getActiveSheet().getSheetId()
  );
  Logger.log(res);
}

/**
 * User action. Import the CSV file
 */
function userActionExportToCSV() {
  var res = exportToCSV_(CSV_FILE_ID, SpreadsheetApp.getActive().getId(), SpreadsheetApp.getActiveSheet().getSheetId());
  Logger.log(res);
}

/**
 * Imports the CSV file to the Sheet
 * @param {string} csvId CSV file Id
 * @param {string} spreadsheetId  Spreadsheet Id
 * @param {string} sheetId Sheet Uid
 * @return {any}
 */
function importFromCSV_(csvId, spreadsheetId, sheetId) {
  // Get CSV data

  var data = DriveApp.getFileById(csvId).getBlob().getDataAsString();

  // Clear the Sheet
  var updateCellsRequest = Sheets.newUpdateCellsRequest();
  updateCellsRequest.fields = 'userEnteredValue';
  updateCellsRequest.range = { sheetId: sheetId };
  batchUpdateSpreadsheet_(
    {
      updateCells: updateCellsRequest,
    },
    spreadsheetId
  );

  // Paste the data
  var pasteDataRequest = Sheets.newPasteDataRequest();
  pasteDataRequest.coordinate = {
    sheetId: SpreadsheetApp.getActiveSheet().getSheetId(),
    rowIndex: 0,
    columnIndex: 0,
  };
  pasteDataRequest.data = data;
  pasteDataRequest.type = SpreadsheetApp.CopyPasteType.PASTE_VALUES;
  pasteDataRequest.delimiter = ',';

  var batchUpdateSpreadsheetResponse = batchUpdateSpreadsheet_(
    {
      pasteData: pasteDataRequest,
    },
    spreadsheetId
  );
  return batchUpdateSpreadsheetResponse;
}

/**
 *
 * @param {string} csvId
 * @param {string} spreadsheetId
 * @param {string | number} sheetId
 */
function exportToCSV_(csvId, spreadsheetId, sheetId) {
  var url = Utilities.formatString(
    'https://docs.google.com/spreadsheets/export?id=%s&exportFormat=csv&gid=%s',
    spreadsheetId,
    sheetId
  );

  var data = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
  }).getBlob();

  DriveApp.getFileById(csvId).setContent(data.getDataAsString());
}

/**
 *
 * @param {object} request Request object
 * @param {string} spreadsheetId Spreadsheet Id
 * @return {object} BatchUpdateSpreadsheetResponse
 */
function batchUpdateSpreadsheet_(request, spreadsheetId) {
  var resource = {
    requests: [],
  };
  resource.requests.push(request);
  var batchUpdateSpreadsheetResponse = Sheets.Spreadsheets.batchUpdate(resource, spreadsheetId);
  return batchUpdateSpreadsheetResponse;
}
