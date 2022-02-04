/* global ImportxmlScrapper */

/**
 *
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('IMPORTXML-SCRAPPER')
    .addItem('Init', 'userActionInit')
    .addItem('Scrape', 'userActionScrape')
    .addItem('Assign a timebased trigger', 'userActionAssignTimebasedTrigger')
    .addItem('Stop the timebased trigger', 'userActionStopTimebasedTrigger')
    .addToUi();
}

/**
 *
 */
function userActionInit() {
  new ImportxmlScrapper(SpreadsheetApp.getActive()).init();
}

/**
 *
 */
function userActionScrape() {
  new ImportxmlScrapper(SpreadsheetApp.getActive()).scrape({});
}

/**
 *
 */
function userActionAssignTimebasedTrigger() {
  const book = SpreadsheetApp.getActive();
  const bookId = book.getId();
  PropertiesService.getScriptProperties().setProperties({ bookId });
  clearTriggers_();
  ScriptApp.newTrigger('timebasedTrigger_').timeBased().everyMinutes(1).create();
  book.toast('OK');
}

/**
 *
 */
function userActionStopTimebasedTrigger() {
  clearTriggers_();
  SpreadsheetApp.getActive().toast('OK');
}

/**
 *
 */
function timebasedTrigger_() {
  try {
    const { bookId } = PropertiesService.getScriptProperties().getProperties();
    const book = SpreadsheetApp.openById(bookId);
    const res = new ImportxmlScrapper(book).scrape({});
    if (res == undefined) clearTriggers_();
  } catch (error) {
    console.error(error.message, error);
    clearTriggers_();
  }
}

/**
 *
 */
function clearTriggers_() {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    if (trigger.getEventType() === ScriptApp.EventType.CLOCK && trigger.getHandlerFunction() === 'timebasedTrigger_')
      ScriptApp.deleteTrigger(trigger);
  });
}
