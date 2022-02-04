/**
 * @file Hides empty columns on a sheet
 * @url
 * {@see https://ru.stackoverflow.com/questions/1085625}
 */

/**
 * Runs the snippet
 */
function run() {
  const sheet = SpreadsheetApp.getActiveSheet();
  hideEmptyColumnsOfSheet_(sheet);
}

/**
 * Hides empty columns on a sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {number} [headersRows=1] Perhaps the headlines should be skipped? If not, enter 0
 * @return {void}
 */
const hideEmptyColumnsOfSheet_ = (sheet, headersRows = 1) => {
  const sheetId = sheet.getSheetId();
  const bookId = sheet.getParent().getId();

  const values = Sheets.Spreadsheets.Values.get(bookId, sheet.getName(), {
    majorDimension: 'COLUMNS',
  });

  const createUpdateDimensionPropertiesRequest = fabricUpdateDimensionPropertiesRequest_(sheetId);

  const updateDimensionPropertiesRequests = values.values.reduceRight(
    (
      /** @type {Array.<GoogleAppsScript.Sheets.Schema.UpdateDimensionPropertiesRequest>} */ p,
      /** @type {Array.<any>} */ c,
      /** @type {number} */ i
    ) => {
      if (!c.slice(headersRows).some(Boolean)) {
        let last = p[p.length - 1];
        if (last == undefined) {
          last = createUpdateDimensionPropertiesRequest({
            startIndex: i,
            endIndex: i + 1,
          });
          p.push(last);
        }
        if (i + 1 === last.range.startIndex) last.range.startIndex = i;
        else
          p.push(
            createUpdateDimensionPropertiesRequest({
              startIndex: i,
              endIndex: i + 1,
            })
          );
      }
      return p;
    },
    []
  );

  const batchUpdateSpreadsheetRequest = Sheets.newBatchUpdateSpreadsheetRequest();
  batchUpdateSpreadsheetRequest.requests = updateDimensionPropertiesRequests.map((updateDimensionPropertiesRequest) => {
    const request = Sheets.newRequest();
    request.updateDimensionProperties = updateDimensionPropertiesRequest;
    return request;
  });
  Sheets.Spreadsheets.batchUpdate(batchUpdateSpreadsheetRequest, bookId);
};

/**
 * Factory for creating UpdateDimensionPropertiesRequest of a sheet
 * @param {number} sheetId
 * @return {GoogleAppsScript.Sheets.Schema.UpdateDimensionPropertiesRequest}
 */
const fabricUpdateDimensionPropertiesRequest_ = (sheetId) => (props) => {
  const updateDimensionPropertiesRequest = Sheets.newUpdateDimensionPropertiesRequest();
  updateDimensionPropertiesRequest.fields = 'hiddenByUser';
  updateDimensionPropertiesRequest.properties = { hiddenByUser: true };
  updateDimensionPropertiesRequest.range = Sheets.newDimensionRange();
  updateDimensionPropertiesRequest.range.dimension = 'COLUMNS';
  updateDimensionPropertiesRequest.range.sheetId = sheetId;
  updateDimensionPropertiesRequest.range.startIndex = props.startIndex;
  updateDimensionPropertiesRequest.range.endIndex = props.endIndex;
  return updateDimensionPropertiesRequest;
};
