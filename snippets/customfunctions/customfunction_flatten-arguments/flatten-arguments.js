// https://stackoverflow.com/questions/58448333/custom-function-udf-how-to-input-values-as-a-range/58542178#58542178
/**
 *
 * @param {*} date
 * @param {*} pair
 */
function OHLCV_CEXIO_1d(date, pair) {
  try {
    date = Array.isArray(date) ? date.flat(2) : [date];
    pair = Array.isArray(pair) ? pair.flat(2) : [pair];
    return date.map(function (date) {
      return pair.map(function (pair) {
        var url = 'https://cex.io/api/ohlcv/hd/' + date + '/' + pair + '/';
        var response = UrlFetchApp.fetch(url, {
          muteHttpExceptions: true,
        });
        var json = response.getContentText();
        // return json;
        var data = JSON.parse(json);
        var result = data.data1d;
        return result;
      });
    });
  } catch (err) {
    return Utilities.formatString('%s\n%s', err.message, err.stack);
  }
}
