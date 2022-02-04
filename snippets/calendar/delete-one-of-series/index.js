/**
 *
 * Deletes only specific events from series that match by date and search term
 * Retuns affected events
 *
 * @param {string} calendarId
 * @param {Date} start
 * @param {Date} end
 * @param {string} search
 * @returns {GoogleAppsScript.Calendar.Schema.Event[]}
 */
function deleteEventFromSeries(calendarId, start, end, search) {
  const timeMin = start.toISOString();
  const timeMax = end.toISOString();
  const events = Calendar.Events.list(calendarId, {
    timeMin,
    timeMax,
    q: search,
    singleEvents: true,
    fields: 'items',
  });
  return events.items.length
    ? events.items
        .filter((event) => event.recurringEventId)
        .map((event) => ((event.status = 'cancelled'), Calendar.Events.patch(event, calendarId, event.id)))
    : [];
}
