/**
 *
 */
function getLastValueByFullColumnAddres() {
  var range = SpreadsheetApp.getActive().getRange('Ответы на форму (2)!B:B');
  var values = range.getValues();
  var lValue = '';
  values.some(function (_, i, arr) {
    if (arr[arr.length - 1 - i][0] !== '') {
      lValue = arr[arr.length - 1 - i][0];
      return true;
    }
  });
  Logger.log(lValue);
}

/**
 *
 */
function getLastRowValuesOfSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var dataValues = sheet.getDataRange().getValues();
  var lastValues = dataValues[dataValues.length - 1].slice();
  Logger.log(lastValues);
}
