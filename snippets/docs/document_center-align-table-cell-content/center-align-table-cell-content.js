/**
 * @file Center align table cell content
 * @url https://webapps.stackexchange.com/questions/133249
 */

/**
 * Run the snippet
 */
function run() {
  var doc = DocumentApp.getActiveDocument();
  setСenterAlignmentForAllTables2_(doc);
}

/**
 *
 * @param {GoogleAppsScript.Document.Document} doc
 */
function setСenterAlignmentForAllTables_(doc) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.VERTICAL_ALIGNMENT] = DocumentApp.VerticalAlignment.CENTER;
  var tables = doc.getBody().getTables();
  tables.forEach(function (table) {
    var numRows = table.getNumRows();
    var indexRow = 0;
    while (indexRow < numRows) {
      var row = table.getRow(indexRow);
      var numCells = row.getNumCells();
      var indexCell = 0;
      while (indexCell < numCells) {
        var cell = row.getCell(indexCell);
        cell.setAttributes(style);
        indexCell++;
      }
      indexRow++;
    }
  });
}

/**
 *
 * @param {GoogleAppsScript.Document.Document} doc
 */
function setСenterAlignmentForAllTables2_(doc) {
  var style = {};
  style[DocumentApp.Attribute.HORIZONTAL_ALIGNMENT] = DocumentApp.HorizontalAlignment.CENTER;
  style[DocumentApp.Attribute.VERTICAL_ALIGNMENT] = DocumentApp.VerticalAlignment.CENTER;
  var body = doc.getBody();
  for (var i = 0; i < body.getNumChildren(); i++) {
    if (body.getChild(i).getType() == 'TABLE') {
      var table = body.getChild(i).asTable();
      var rows = table.getNumRows();
      var cols = table.getChild(0).asTableRow().getNumChildren();
      for (var j = 0; j < rows; j++) {
        for (var k = 0; k < cols; k++) {
          body.getChild(i).asTable().getCell(j, k).setAttributes(style);
        }
      }
    }
  }
}
