/* exported run, getBlobImageByIndexFromDoc_ */

/**
 * @param {string} from The ID of a Document with the inlineImage
 * @param {number} index The index of the inlineImage. Starts from 0
 */
function getBlobImageByIndexFromDoc_(from, index) {
  var template = 'https://docs.google.com/feeds/download/documents/export/Export' + '?id=%s&exportFormat=zip';
  var url = Utilities.formatString(template, from);
  var file = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken(),
    },
  }).getBlob();
  var blobs = Utilities.unzip(file);
  var imagePath = blobs
    .find(function (b) {
      return /^.+?\.html$/.test(b.getName());
    })
    .getDataAsString()
    .match(/<img.+?src="images\/image\d+\..{2,4}".+?>/g)
    [index].replace(/^.*?"(images\/image\d+\..{2,4})".*?$/g, '$1');
  var patt = new RegExp(imagePath);
  var blob = blobs.find(function (b) {
    return patt.test(b.getName());
  });
  return blob;
}

/**
 * Runs the example
 * @ignore
 */
function run() {
  var blob = getBlobImageByIndexFromDoc_('1HhlzUD2RuN0coxp7IuOBwiS4hYWAKdjUzUyiyoFjH4s', 0);
  DocumentApp.openById('1h7_W36wN-9p2Msabj-ZBcHLGQWdX-QtB_YqBpsmrMp0').getBody().clear().appendImage(blob);
}
