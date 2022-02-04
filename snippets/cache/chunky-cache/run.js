/* eslint-disable no-console */
/* global ChunkyCache BlobCache */

/**
 * Runs the snippet. Caches a 200KB string.
 */
function run() {
  const value = DriveApp.getFileById('19WGODj4pQ-VgwI2unZfQCxX25D4xaB4Q').getBlob().getDataAsString();
  new ChunkyCache().put('key', value);

  const cacheValue = new ChunkyCache().get('key');
  new ChunkyCache().remove('key');
  console.log(value.length, cacheValue.length);
}

/**
 * Runs the snippet. Caches an image.
 * Then creates a copy of this from the cache
 */
function runCacheImage() {
  const data = DriveApp.getFileById('14Sm76a_dJI4eKtSbfCfDq4gVjcUzREE7').getBlob();
  new BlobCache().putBlob('myfile1', data);

  DriveApp.createFile(new BlobCache().getBlob('myfile1'));
  new BlobCache().remove('myfile1');
}

/**
 * Runs the test. Caches a data from the Google Sheet.
 * Compares the original data and the cache data
 */
function runTest() {
  const sheet = SpreadsheetApp.openById('19TlsK5ICOuzrv07OSw5n3KtYbTHn00p1iFY6QArBWTM').getSheetByName(
    'aka FuzzyMatch'
  );
  const data = sheet.getDataRange().getValues();
  const chunky = new ChunkyCache(CacheService.getUserCache());
  chunky.put('Data', data);
  const check = chunky.get('Data');
  console.log(
    data.length,
    check.length,
    JSON.stringify(data) === JSON.stringify(check) // It's not work for Date values
  );
}
