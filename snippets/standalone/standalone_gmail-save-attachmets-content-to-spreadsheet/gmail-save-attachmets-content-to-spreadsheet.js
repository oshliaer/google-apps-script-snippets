/**
 * @file Saves gmail attachments content to spreadsheet
 */

/**
 @typedef AttachmentsOnSheetMessage
 @type {Object}
 @property {GoogleAppsScript.Gmail.GmailMessage} message
 @property {GoogleAppsScript.Gmail.GmailAttachment[]} attachments
 @property {object[][]} values
 */

/**
 @typedef AttachmentsOnSheet
 @type {Object}
 @property {GoogleAppsScript.Gmail.GmailThread} thread
 @property {AttachmentsOnSheetMessage[]} messages
 */

/**
 * User action. Runs the snippet
 * Saves the unreads inbox to the spreadsheet
 */
function run() {
  var sheet = SpreadsheetApp.openById('1YvGje4cbSwHQwsQFYVQGfaYG4fm0LLd1T2RTjvZ5i5c').getSheetByName('sheet');
  sheet.clearContents();

  /**
   * @type {callbackParser}
   * @param {GoogleAppsScript.Gmail.GmailAttachment} attachment
   * @param {number} i
   * @param {GoogleAppsScript.Gmail.GmailAttachment[]} attachment
   */
  var cbParser = function (attachment) {
    var values = [];
    if (attachment.getContentType() === 'text/plain') {
      var text = attachment.getDataAsString();
      values = [text.split(/[\n\r]/g)];
      if (values.length) sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[0].length).setValues(values);
    }
    return values;
  };
  /**
   * @type {callbackThread}
   * @param {GoogleAppsScript.Gmail.GmailThread} thread
   * @param {AttachmentsOnDriveMessage[]} messages
   */
  var cbThread = function (thread) {
    thread.markRead().moveToArchive();
  };

  saveAttachmentsContentToSpreadsheet_(
    'subject:SBERBANK filename:txt has:attachment label:unread in:inbox ',
    sheet,
    cbParser,
    cbThread
  );
}

/**
 *
 * @param {string} searchQuery Gmail query string
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {callbackParser} cbParser
 * @param {callbackThread} cbThread
 * @return {AttachmentsOnSheet[]}
 */
function saveAttachmentsContentToSpreadsheet_(searchQuery, sheet, cbParser, cbThread) {
  return GmailApp.search(searchQuery).map(function (thread) {
    var res = {
      thread: thread,
      messages: thread.getMessages().map(function (message) {
        var attachments = message.getAttachments();
        var values = attachments.map(cbParser);
        return { message: message, attachments: attachments, values: values };
      }),
    };
    cbThread && cbThread(thread);
    return res;
  });
}

/**
 * This callback after iterate all of the thread.
 * @callback callbackThread
 * @param {GoogleAppsScript.Gmail.GmailThread} thread
 * @param {AttachmentsOnDriveMessage[]} messages
 */

/**
 * Parses the attachment
 * @callback callbackParser
 * @param {GoogleAppsScript.Gmail.GmailAttachment} attachment
 * @param {number} i
 * @param {GoogleAppsScript.Gmail.GmailAttachment[]} attachment
 */
