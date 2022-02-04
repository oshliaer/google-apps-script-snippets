/* eslint-disable require-jsdoc */
function onEdit() {
  // Dowant you want here
  // ...

  SpreadsheetApp.getActive().getRangeByName('LAST_EDITS').setValue(new Date());
}

function clearTrigger() {
  const BOOK_ID = '1YvGje4cbSwHQwsQFYVQGfaYG4fm0LLd1T2RTjvZ5i5c';
  const lastEditsRange = SpreadsheetApp.openById(BOOK_ID).getRangeByName('LAST_EDITS');
  const current = lastEditsRange.getValue();
  if (current && current.getTime && new Date() - current > 5 * 60 * 1000) lastEditsRange.setValue('');
}
