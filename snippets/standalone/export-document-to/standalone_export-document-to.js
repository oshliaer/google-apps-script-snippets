/**
 * @file Exporting Spreadsheets to files
 */

/**
 *
 */
function run() {
  Logger.log(exportDocumentToFile_('1gG0_EClZC4ztKHDT2yn8v9NmUh_-sqYFe9vGg6Snxgg', 'rtf'));
}

/**
 * Exports the document to a file on Drive
 *
 * @param {string} documentId Document ID
 * @param {string} type MimeType or extension
 * @returns {GoogleAppsScript.Drive.File}
 */
function exportDocumentToFile_(documentId, type) {
  /* globals __SNIPPETS__TYPES__EXPORT__DOC__ */
  var type_ = __SNIPPETS__TYPES__EXPORT__DOC__[type];
  var url = Drive.Files.get(documentId).exportLinks[type_];
  var blob = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  });
  var file = DriveApp.createFile(blob);
  return file;
}

(function (scope) {
  var TYPES = {
    'application/epub+zip': 'application/epub+zip',
    'application/pdf': 'application/pdf',
    'application/rtf': 'application/rtf',
    'application/vnd.oasis.opendocument.text': 'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip': 'application/zip',
    'text/html': 'text/html',
    'text/plain': 'text/plain',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    epub: 'application/epub+zip',
    html: 'text/html',
    odt: 'application/vnd.oasis.opendocument.text',
    pdf: 'application/pdf',
    rtf: 'application/rtf',
    txt: 'text/plain',
    zip: 'application/zip',
  };
  scope.__SNIPPETS__TYPES__EXPORT__DOC__ = TYPES;
})(this);
