/**
 *
 * @param {GoogleAppsScript.Events.DoGet} e
 */
function doGet(e) {
  if (e.parameter.ui == '1') {
    var htmlTemplate = HtmlService.createTemplateFromFile('spreadsheet_to_json_ui');
    return htmlTemplate.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  return e.parameter.mimetype == 'json'
    ? ContentService.createTextOutput(JSON.stringify(getJson(e.parameter.id))).setMimeType(ContentService.MimeType.JSON)
    : ContentService.createTextOutput(JSON.stringify(getJson(e.parameter.id), null, '\t')).setMimeType(
        ContentService.MimeType.TEXT
      );
}

/**
 *
 */
function getWebappUrl() {
  return ScriptApp.getService().getUrl();
}

/**
 *
 * @param {string} spreadsheetUrl
 */
function getJson(spreadsheetId) {
  return Sheets.Spreadsheets.get(spreadsheetId, {
    fields: 'sheets(properties(title),data(rowData(values(effectiveValue))))',
  }).sheets.reduce(function (p, s) {
    p[s.properties.title] = [];
    var values = s.data[0].rowData;
    var headers = values.shift().values;
    var headersIndex = headers
      .map(function (h, i) {
        return h.effectiveValue && h.effectiveValue.stringValue ? i : undefined;
      })
      .filter(function (h) {
        return h !== undefined;
      });
    p[s.properties.title] = values.map(function (row) {
      return headersIndex.reduce(function (p, index) {
        p[headers[index].effectiveValue.stringValue] = row.values[index].effectiveValue
          ? row.values[index].effectiveValue[Object.keys(row.values[index].effectiveValue)[0]]
          : undefined;
        return p;
      }, {});
    });
    return p;
  }, {});
}

/**
 *
 */
function testGetJson() {
  Logger.log(getJson('1j_CwQQTAeXhjlBUweENcrDCWixbWBH0sjoAHQz2bjr0'));
}
