/**
 * @param {Date} date
 */
function toTime(date, withoutTime) {
  var date_ = new Date(date);
  if (withoutTime === true) date_.setHours(0, 0, 0, 0);
  return date_.getTime();
}

/**
 * comapre
 */
function compareDates() {
  var sheetDate = SpreadsheetApp.getActiveRange().getValue();
  var currentDate = new Date();
  Logger.log('%s < %s: %s', toTime(sheetDate), toTime(currentDate), toTime(sheetDate) < toTime(currentDate));
  Logger.log(
    '%s === %s: %s',
    toTime(sheetDate, true),
    toTime(currentDate, true),
    toTime(sheetDate, true) === toTime(currentDate, true)
  );
}
