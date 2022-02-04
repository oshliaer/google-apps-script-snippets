/* exported UNIONRANGES */

/**
 * A custom function. Unions ranges
 *
 * @example
 *
 * =UNIONRANGES(Sheet1!A2:B,{{1,2,3};{4,5,6}}, A2, 36, "44", B3:C13)
 *
 * @param {...object} ranges Data for union
 * @return {object[][]} The unioned range
 * @function UNIONRANGES
 * @customfunction
 */
function UNIONRANGES(ranges) {
  var result = [];
  var length = 0;
  try {
    for (var j = 0; j < arguments.length; j++) {
      if (!(arguments[j] instanceof Array)) arguments[j] = [[arguments[j]]];
      length += arguments[j].length * arguments[j][0].length;
    }
    if (length > 400000) return '#ERROR_OVER_TOTAL_CELLS: ' + length;
    for (var i = 0; i < arguments.length; i++)
      result = result.concat(
        arguments[i].filter(function (el) {
          return el.join('').length > 0;
        })
      );
    return result;
  } catch (err) {
    return err.name + ' ' + err.message;
  }
}
