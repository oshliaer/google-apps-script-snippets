/**
 * @file Creates a copy of file and sets its title
 * @url https://support.google.com/docs/thread/12032976?msgid=12032976
 */

/**
 * User action. Runs the snippet
 */
function run() {
  var fileId = '1MzgDapq7td4DOG8rV6GJj81ib8udOFCrcOiG4d-pbSM';
  var namer = function (title) {
    return title + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), ' yyyy-MM-dd HH:mm');
  };
  backupFileById_(fileId, namer);
}

/**
 *
 * @param {string} id A file ID
 * @param {namerCallback} namer
 * @return {GoogleAppsScript.Drive.File}
 */
function backupFileById_(id, namer) {
  namer =
    namer ||
    function (titile) {
      return titile;
    };
  var file = DriveApp.getFileById(id);
  var title = namer(file.getName());
  var copy = file.makeCopy(title);
  return copy;
}

/**
 * This callback creates a new file title string.
 * @callback namerCallback
 * @param {string} title
 * @return {string}
 */
