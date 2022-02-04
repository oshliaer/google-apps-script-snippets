/**
 * @file getting Videos from Youtube with IDs
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  var list = getFilesListFromFolder_('ASDFSDFASFWERTF');
}

/**
 * Returns a list of files
 * @param {string} id Folder's id
 * @return {Array.<Array.<object>>}
 */
function getFilesListFromFolder_(id) {
  return Drive.Files.list({ q: Utilities.formatString('"%s" in parents', id) }).items;
}
