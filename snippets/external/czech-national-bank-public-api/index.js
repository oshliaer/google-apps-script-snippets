/**
 * @file
 * @url https://qna.habr.com/q/779817
 */

/**
 * Get currencies by a date
 */
function run() {
  const httpResponse = UrlFetchApp.fetch(
    'https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt?date=20.05.2020'
  );
  const data = Utilities.newBlob(httpResponse.getContent(), 'plain/text')
    .getDataAsString()
    .split('\n')
    .map((line) => line.split('|'))
    .slice(1);
  console.log(data);
  /*
  // Paste to a sheet
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  */
}
