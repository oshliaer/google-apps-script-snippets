/**
 * @file Read a xml file
 * @url
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  const blob = DriveApp.getFileById('1ZA6qJA7s6MWuCb65dx0E6GtWi5eL7hYc').getBlob();

  const isUTF8BOM = isUTF8BOM_(blob);

  const content = (isUTF8BOM.BOM ? Utilities.newBlob(isUTF8BOM.bytes.slice(3)) : blob).getDataAsString('UTF-8');

  const xml = XmlService.parse(content);

  const root = xml.getRootElement();

  root
    .getChild('ExportData')
    .getChildren('tag')
    .forEach((child) => console.log(child.getAttribute('Value').getValue()));

  console.log(XmlService.getPrettyFormat().format(xml.getRootElement()));
}

/**
 *
 * @param {GoogleAppsScript.Base.Blob} blob
 * @return {{
 *   bytes: Array.<number>,
 *   BOM: boolean
 * }}
 */
function isUTF8BOM_(blob) {
  const bytes = blob.getBytes();
  return { bytes: bytes, BOM: bytes.slice(0, 3).join('') === '-17-69-65' };
}
