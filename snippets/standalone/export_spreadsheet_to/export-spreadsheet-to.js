/**
 * @file Exporting Spreadsheets to files
 * @see
 * {@link https://qna.habr.com/q/718667}
 */

/**
 *
 */
function run() {
  Logger.log(exportSpreadsheetToFile_('1TpHUfTvA7xBi4TLnWaplGasDumauA3YyMgXjXeQ2cyo', 'tsv'));
}

/**
 *
 */
function runSheet() {
  const spec = ['COUNTIF']; // List of sheets for export

  const spreadsheet = SpreadsheetApp.openById('1TpHUfTvA7xBi4TLnWaplGasDumauA3YyMgXjXeQ2cyo').copy('tmp');

  spec.forEach((sheetName) => {
    const dr = spreadsheet.getSheetByName(sheetName).getDataRange();
    dr.setValues(dr.getValues());
  });

  spreadsheet.getSheets().forEach((sheet) => {
    if (spec.indexOf(sheet.getName()) < 0) spreadsheet.deleteSheet(sheet);
  });

  const spreadsheetId = spreadsheet.getId();

  const file = exportSpreadsheetToFile_(spreadsheetId, 'xlsx');

  DriveApp.getFileById(spreadsheetId).setTrashed(true);

  return file;
}

/**
 * Exports the spreadsheet to a file on Drive
 *
 * @param {string} spreadsheetId Spreadhseet ID
 * @param {string} type MimeType or extension
 * @returns {GoogleAppsScript.Drive.File}
 */
function exportSpreadsheetToFile_(spreadsheetId, type) {
  const blob = exportSpreadsheetToBlob_(spreadsheetId, type);
  const file = DriveApp.createFile(blob);
  return file;
}

/**
 * Exports the spreadsheet to Blob
 *
 * @param {string} spreadsheetId Spreadhseet ID
 * @param {string} type MimeType or extension
 * @returns {GoogleAppsScript.Base.Blob}
 */
function exportSpreadsheetToBlob_(spreadsheetId, type) {
  /* globals __SNIPPETS__TYPES__EXPORT__SHEET__ */
  const type_ = __SNIPPETS__TYPES__EXPORT__SHEET__[type];
  const url = Drive.Files.get(spreadsheetId).exportLinks[type_];
  const blob = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  });
  return blob;
}

(function (scope) {
  const TYPES = {
    'application/x-vnd.oasis.opendocument.spreadsheet': 'application/x-vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.spreadsheet': 'application/vnd.oasis.opendocument.spreadsheet',
    ods: 'application/x-vnd.oasis.opendocument.spreadsheet',
    'text/tab-separated-values': 'text/tab-separated-values',
    tsv: 'text/tab-separated-values',
    'application/pdf': 'application/pdf',
    pdf: 'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv': 'text/csv',
    csv: 'text/csv',
    'application/zip': 'application/zip',
    zip: 'application/zip',
  };
  scope.__SNIPPETS__TYPES__EXPORT__SHEET__ = TYPES;
})(this);
