/**
 *
 */
function run() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var images = sheet.getImages();
  images.forEach(function (image) {
    Logger.log(image);
  });
}

/**
 *
 */
function run2() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var image = sheet.getRange('E5').getDisplayValue();
  Logger.log(image);
}

/**
 *
 */
function run3() {
  // Sheets.Spreadsheets.
}
