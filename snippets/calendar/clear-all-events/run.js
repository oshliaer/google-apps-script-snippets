/* global clearAllEvents_ */

/**
 *
 */
function run() {
  const calendar = CalendarApp.getCalendarById('1fq7choqdctaal2sk5i5du43qc@group.calendar.google.com');
  console.log(clearAllEvents_(calendar));
}
