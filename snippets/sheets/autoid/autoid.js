/**
 * @file Adds autoid
 * @url https://stackoverflow.com/questions/58513757/automatically-generate-a-unique-sequential-id-in-google-sheets?noredirect=1#58513757
 */

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
function autoid_(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;
  var indexId = data[0].indexOf('ID');
  var indexDate = data[0].indexOf('DATE');
  if (indexId < 0 || indexDate < 0) return;
  var id = data.reduce(
    function (p, row) {
      var year = row[indexDate] && row[indexDate].getTime ? row[indexDate].getFullYear() % 100 : '-';
      if (!Object.prototype.hasOwnProperty.call(p.indexByGroup, year)) {
        p.indexByGroup[year] = [];
      }
      var match = ('' + row[indexId]).match(/(\d+)-(\d+)/);
      var idVal = row[indexId];
      if (match && match.length > 1) {
        idVal = match[2];
        p.indexByGroup[year].push(+idVal);
      }
      p.ids.push(idVal);
      p.years.push(year);
      return p;
    },
    { indexByGroup: {}, ids: [], years: [] }
  );

  // Logger.log(JSON.stringify(id, null, '  '));

  var newId = data
    .map(function (row, i) {
      if (row[indexId] !== '') return [row[indexId]];
      if (isNumeric(id.years[i])) {
        var lastId = Math.max.apply(
          null,
          id.indexByGroup[id.years[i]].filter(function (e) {
            return isNumeric(e);
          })
        );
        lastId = lastId === -Infinity ? 1 : lastId + 1;
        id.indexByGroup[id.years[i]].push(lastId);
        return [Utilities.formatString('%s-%s', id.years[i], ('000000000' + lastId).slice(-3))];
      }
      return [''];
    })
    .slice(1);
  sheet.getRange(2, indexId + 1, newId.length).setValues(newId);
}

/**
 *
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
function onEdit(e) {
  try {
    var lock = LockService.getScriptLock();
    if (lock.tryLock(0)) {
      autoid_(e.range.getSheet());
      lock.releaseLock();
    }
  } catch (error) {
    console.log('', error, error.stack, error.message);
    e.source.toast(error, 'error', 0);
  }
}

/**
 *
 */
function userActionUpdateId() {
  onEdit({
    range: SpreadsheetApp.getActiveRange(),
    source: SpreadsheetApp.getActive(),
  });
}

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('AUTOID').addItem('Update', 'userActionUpdateId').addToUi();
}

/**
 *
 * @param {any} n
 * @return {boolean}
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
