var SPRID = '128F4LovqmOV1E2LqXRBXj3HuDl4SCDpwUhJgj8Yzd1E';

function appendRow(data) {
  SpreadsheetApp.openById(SPRID).appendRow([new Date(), data]);
}

function readLastRow() {
  var data = SpreadsheetApp.openById(SPRID).getDataRange().getValues();
  return JSON.stringify(data[data.length - 1], null, '  ');
}

function getValuesOfRange(a1Nota) {
  var data = SpreadsheetApp.openById(SPRID).getRange(a1Nota).getValues();
  return JSON.stringify(data[data.length - 1], null, '  ');
}
