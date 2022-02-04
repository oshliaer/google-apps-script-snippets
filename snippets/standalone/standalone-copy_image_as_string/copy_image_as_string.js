/* eslint-disable camelcase */
/**
 *
 * @param {{
 *   sheet: GoogleAppsScript.Spreadsheet.Sheet,
 *   blobSource: GoogleAppsScript.Base.BlobSource,
 *   column: number,
 *   row: number,
 *   functionName: string
 * }} params
 * @return {GoogleAppsScript.Spreadsheet.OverGridImage}
 */
function insertImage(params) {
  var overGridImage = params.sheet.insertImage(params.blobSource, params.column, params.row);
  if (params.functionName && params.functionName.length) overGridImage.assignScript(params.functionName);
  return overGridImage;
}

/**
 * @param {GoogleAppsScript.Base.BlobSource} blobSource
 * @return {{
 *   base64: string,
 *   name: string,
 *   contentType: string
 * }}
 */
function blobSourceToStringSource_(blobSource) {
  return {
    base64: Utilities.base64Encode(blobSource.getBytes()),
    name: blobSource.getName(),
    contentType: blobSource.getContentType(),
  };
}

/**
 * @param {{
 *   base64: string,
 *   name: string,
 *   contentType: string
 * }} stringSource
 * @return {GoogleAppsScript.Base.BlobSource}
 */
function stringSourceToBlobSource_(stringSource) {
  return Utilities.newBlob(Utilities.base64Decode(stringSource))
    .setName(stringSource.name || '')
    .setContentType(stringSource.contentType || '');
}

/**
 *
 */
function test_insertImage() {
  var file = DriveApp.searchFiles('mimeType="image/jpeg"').next();
  var blobSource = file.getBlob();

  var name = blobSource.getName();
  var contentType = blobSource.getContentType();

  var digestedString = blobSourceToStringSource_(blobSource);

  var digestedBlob = stringSourceToBlobSource_(digestedString);
  digestedBlob.setName(name);
  digestedBlob.setContentType(contentType);

  var sheet = SpreadsheetApp.openById('1XWadinEE5OauB2XpYGYDxJRSYAPiP7MDjeObzewKdzY').getSheets()[0];
  insertImage({ sheet: sheet, blobSource: digestedBlob, column: 1, row: 1 });
}
