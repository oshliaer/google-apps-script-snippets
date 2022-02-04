/**
 * @file Saves gmail attacments to drive
 */

/**
 @typedef AttacmentsOnDriveMessage
 @type {Object}
 @property {GoogleAppsScript.Gmail.GmailMessage} message
 @property {GoogleAppsScript.Gmail.GmailAttacment[]} attachments
 @property {GoogleAppsScript.Drive.File[]} files
 */

/**
 @typedef AttacmentsOnDrive
 @type {Object}
 @property {GoogleAppsScript.Gmail.GmailThread} thread
 @property {AttacmentsOnDriveMessage[]} messages
 */

/**
 * User action. Runs the snippet
 * Saves the unreads inbox to the folder
 */
function run() {
  var folder = DriveApp.getFolderById('1_W4QEyo5ggExX1xQvcZjYfZq2QtgJ79r');
  /**
   * @type {callbackThread}
   * @param {GoogleAppsScript.Gmail.GmailThread} thread
   * @param {AttacmentsOnDriveMessage[]} messages
   */
  var cbThread = function (thread) {
    thread.markRead().moveToArchive();
  };
  saveAttachmentsToDrive_('subject:Счёт от ПАО «Ростелеком» label:unread in:inbox ', folder, cbThread);
}

/**
 *
 * @param {string} searchQuery Gmail query string
 * @param {GoogleAppsScript.Drive.Folder} folder
 * @param {cbThread} cbThread
 * @return {AttacmentsOnDrive[]}
 */
function saveAttachmentsToDrive_(searchQuery, folder, cbThread) {
  folder = folder || DriveApp.getRootFolder();
  return GmailApp.search(searchQuery).map(function (thread) {
    var res = {
      thread: thread,
      messages: thread.getMessages().map(function (message) {
        var attachments = message.getAttachments();
        var files = attachments.map(function (attachment) {
          var file = folder.createFile(attachment.copyBlob());
          return file;
        });
        return { message: message, attachments: attachments, files: files };
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
 * @param {AttacmentsOnDriveMessage[]} messages
 */
