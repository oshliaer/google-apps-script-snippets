/* global deleteEventFromSeries */

/**
 * Run the snippet
 */
function run() {
  const calendar = CalendarApp.getCalendarById('jllt2nf095qf4ea1pfl1qm1o4o@group.calendar.google.com');
  const now = new Date();
  now.setDate(now.getDate());
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  end.setDate(end.getDate() + 2);
  console.log(deleteEventFromSeries(calendar.getId(), start, end, 'event'));
}
