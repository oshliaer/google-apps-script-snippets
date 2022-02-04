/**
 *
 */
function myFunction() {
  var chart = SpreadsheetApp.getActiveSheet().getCharts()[0];
  var ranges = chart.getRanges();
  var builder = chart.modify();
  var spreadsheet = SpreadsheetApp.openById('16WXWHS5OHtBERqhGhWyHvY1uyFA5Zc3SUm5B87DUSpo');
  //asdfa sdf sdf
  builder.clearRanges();
  ranges.forEach(function (range) {
    var sheetName = range.getSheet().getName();
    var nota = range.getA1Notation();
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    builder.addRange(sheet.getRange(nota));
  });

  var copyChart = builder.build();
  spreadsheet.getSheets()[0].insertChart(copyChart);
}
