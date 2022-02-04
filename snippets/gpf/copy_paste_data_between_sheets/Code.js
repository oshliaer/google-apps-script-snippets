/** @OnlyCurrentDoc */

/**
 *
 */
function Macro1() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E1:F1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getRange('A7').activate();
  spreadsheet.getRange('E1:F3').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
}

/**
 *
 */
function Pasteacrosssheets() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('E1:F1').activate();
  var currentCell = spreadsheet.getCurrentCell();
  spreadsheet.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  currentCell.activateAsCurrentCell();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Sheet1'), true);
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.PREVIOUS).activate();
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  spreadsheet.getRange('A7').activate();
  spreadsheet
    .getRange('Sheet2!E1:F3')
    .copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.UP).activate();
}

/**
 *
 */
function CopyDataMacro() {
  copyData_();
}
