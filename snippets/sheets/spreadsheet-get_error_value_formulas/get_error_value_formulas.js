/**
 * @file Sample of customformula
 * @url https://support.google.com/docs/thread/23258741?hl=en
 */

/**
 * Returns error messages of a1nota cells
 * @param {string} a1Nota
 */
function GETERRORMESSAGES(a1Nota) {
  try {
    var url = Utilities.formatString(
      'https://sheets.googleapis.com/v4/spreadsheets/%s?ranges=%s&fields=sheets(data(rowData(values(userEnteredValue%2CeffectiveValue%2CformattedValue))))',
      SpreadsheetApp.getActive().getId(),
      encodeURIComponent(a1Nota)
    );
    var res = UrlFetchApp.fetch(url, {
      headers: {
        Authorization: 'Bearer ' + PropertiesService.getScriptProperties().getProperty('CODE'),
      },
    });
    return JSON.parse(res.getContentText()).sheets[0].data[0].rowData.map(function (e) {
      return e.values.map(function (f) {
        return f.effectiveValue.errorValue ? f.effectiveValue.errorValue.message : null;
      });
    });
  } catch (error) {
    return error.message;
  }
}

/**
 * Run once
 */
function saveMyOAuthToken() {
  PropertiesService.getScriptProperties().setProperty('CODE', ScriptApp.getOAuthToken());
}
