/**
 * https://qna.habr.com/q/739089
 */
const SETTINGS = Object.freeze({
  template1Name: 'Sheet1',
  syncListSheet: ['Sheet1', 'Sheet2', 'Sheet3'],
});

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Copy format')
    .addItem(`Copy format from ${SETTINGS.template1Name} to the active sheet`, 'userActionFormatActiveSheetByTemplate')
    .addItem('Copy format from the active sheet to all sheets', 'userActionFormatAllSheetsByActive')
    .addItem(`Sync format for the list ${SETTINGS.syncListSheet.join(', ')}`, 'userActionSyncFormatForList')
    .addToUi();
}

/**
 *
 */
function userActionFormatActiveSheetByTemplate() {
  const book = SpreadsheetApp.getActive();
  const templateSheetName = SETTINGS.template1Name;
  const template = book.getSheetByName(templateSheetName);
  const sheet = book.getActiveSheet();
  formatSheetByTemplate_(sheet, template);
}

/**
 *
 */
function userActionFormatAllSheetsByActive() {
  const template = SpreadsheetApp.getActiveSheet();
  const book = SpreadsheetApp.getActive()
    .getSheets()
    .forEach((sheet) => (sheet !== template ? formatSheetByTemplate_(sheet, template) : undefined));
}

/**
 *
 */
function userActionSyncFormatForList() {
  const activeSheet = SpreadsheetApp.getActiveSheet();
  const templateName = activeSheet.getName();
  const template = SETTINGS.syncListSheet.includes(templateName)
    ? activeSheet
    : SpreadsheetApp.getActive().getSheetByName(SETTINGS.syncListSheet[0]);
  SETTINGS.syncListSheet.forEach((sheetName) => {
    const sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    return sheet !== template ? formatSheetByTemplate_(sheet, template) : undefined;
  });
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} template
 * @return {GoogleAppsScript.Spreadsheet.Range}
 */
function formatSheetByTemplate_(sheet, template) {
  const templateSheetMaxRows = template.getMaxRows();
  const templateSheetMaxCols = template.getMaxColumns();
  const activeSheetMaxRows = sheet.getMaxRows();
  const activeSheetMaxCols = sheet.getMaxColumns();

  const templateRange = template.getRange(1, 1, templateSheetMaxRows, templateSheetMaxCols);
  const sheetRange = sheet.getRange(
    1,
    1,
    activeSheetMaxRows > templateSheetMaxRows ? templateSheetMaxRows : activeSheetMaxRows,
    activeSheetMaxCols > templateSheetMaxCols ? templateSheetMaxCols : activeSheetMaxCols
  );

  templateRange.copyTo(sheetRange, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  templateRange.copyTo(sheetRange, SpreadsheetApp.CopyPasteType.PASTE_COLUMN_WIDTHS, false);
  return sheetRange;
}
