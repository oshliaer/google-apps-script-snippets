/**
 * TOC object
 * @typedef {Array.<{
 *   name: string,
 *   gid: number,
 *   richTextValueBuilder: GoogleAppsScript.Spreadsheet.RichTextValueBuilder
 * }>} TOCBuild
 */

/**
 * Build a TOC object from the passed book
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} book
 * @returns {TOCBuild}
 */
function tocBuilder_(book = SpreadsheetApp.getActive()) {
  return book
    .getSheets()
    .map((sheet) => ({
      name: sheet.getName(),
      gid: sheet.getSheetId(),
    }))
    .map((item) => ((item.richTextValueBuilder = createRichTextValueLink_(item.name, `#gid=${item.gid}`)), item));
}

/**
 * Update the specific Range with the TOC object
 * @param {TOCBuild} tocBuild
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @returns {GoogleAppsScript.Spreadsheet.Range} The updated range
 */
function tocUpdater_(tocBuild, range) {
  range
    .getSheet()
    .getRange(range.getRow(), range.getColumn(), tocBuild.length, 1)
    .setRichTextValues(tocBuild.map((item) => [item.richTextValueBuilder.build()]));
}

/**
 * Create a RichTextValueBuilder with the text and the linkUrl
 * @param {string} text
 * @param {string} linkUrl
 * @returns {GoogleAppsScript.Spreadsheet.RichTextValueBuilder}
 */
function createRichTextValueLink_(text, linkUrl) {
  return SpreadsheetApp.newRichTextValue().setText(text).setLinkUrl(linkUrl);
}
