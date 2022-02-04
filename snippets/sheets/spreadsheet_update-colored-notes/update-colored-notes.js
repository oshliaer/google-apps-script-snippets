/**
 * @file Updates colored notes
 * @url https://ru.stackoverflow.com/questions/1016562/Можно-ли-в-гугл-таблицах-сделать-подсказки-с-привязкой-к-заливке-ячейки
 */

/**
 * User action. Runs the snippet
 */
function run() {
  var dic = {
    '#ff0000': 'Hello!', // red
    '#ffff00': 'OK', // yellow
  };
  var range = SpreadsheetApp.getActiveSheet().getDataRange();
  updateColoredNotes_(dic, range);
}

/**
 * A Color Dictionary
 * @typedef {Object.<string>} colorDic
 */

/**
 *
 * @param {colorDic} dic
 * @param {GoogleAppsScript.Spreadsheet.Range} range
 * @return {GoogleAppsScript.Spreadsheet.Range} range
 */
function updateColoredNotes_(dic, range) {
  var colors = range.getBackgrounds();
  return range.setNotes(
    range.getNotes().map(function (row, i) {
      return row.map(function (_, j) {
        if (dic[colors[i][j]]) return dic[colors[i][j]];
        return '';
      });
    })
  );
}
