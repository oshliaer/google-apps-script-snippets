/**
 *
 */
function getStreetView() {}

/**
 *
 * @param {*} sheet
 * @param {*} row
 */
function getAddress(sheet, row) {
  var longLat = sheet.getRange(Utilities.formatString('%s:%s', row, row)).getValues()[0];
  var response = Maps.newGeocoder().reverseGeocode(longLat[0], longLat[1]);
  var res = 'No Available';
  if (response.status === 'OK') {
    res = response.results[0].formatted_address;
  }
  sheet.getRange(row, 4).setValue(res);
}

/**
 *
 */
function userActionGetAddress() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = SpreadsheetApp.getActiveRange().getRow();
  if (sheet.getName() === 'Sheet1' && row > 1) getAddress(sheet, row);
}

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Process').addItem('getAddress', 'userActionGetAddress').addToUi();
}
