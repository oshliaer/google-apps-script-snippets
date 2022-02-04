/**
 * The fork of
 *   https://gist.github.com/pilbot/9d0567ef1daf556449fb,
 *   https://gist.github.com/glade-at-gigwell/4e080771d685fbf1908edbd98eb2d88c
 */

/**
 * Using the Google Apps Script Cache Service for objects above 100Kb
 */
class ChunkyCache {
  /**
   *
   * @param {GoogleAppsScript.Cache.Cache} cache
   */
  constructor(cache) {
    this.cache = cache || CacheService.getScriptCache();
    this.chunkSize = 100 * 1024;
  }
  /**
   * Gets the cached value for the given key, or null if none is found.
   * https://developers.google.com/apps-script/reference/cache/cache#getkey
   *
   * @param {string} key
   * @returns {any} A JSON.parse result
   */
  get(key) {
    const superKeyjson = this.cache.get(key);
    if (superKeyjson === null) return null;
    const superKey = JSON.parse(superKeyjson);
    const cache = this.cache.getAll(superKey.chunks);
    const chunks = superKey.chunks.map((key) => cache[key]);
    if (
      chunks.every(function (c) {
        return c !== undefined;
      })
    ) {
      return JSON.parse(chunks.join(''));
    }
  }
  /**
   * Adds a key/value pair to the cache.
   * https://developers.google.com/apps-script/reference/cache/cache#putkey,-value
   *
   * @param {string} key
   * @param {string} value
   * @param {number} expirationInSeconds
   */
  put(key, value, expirationInSeconds = 600) {
    const json = JSON.stringify(value);
    const chunks = [];
    const chunkValues = {};
    let index = 0;
    while (index < json.length) {
      const chunkKey = key + '_' + index;
      chunks.push(chunkKey);
      chunkValues[chunkKey] = json.substr(index, this.chunkSize);
      index += this.chunkSize;
    }
    const superKey = {
      chunkSize: this.chunkSize,
      chunks: chunks,
      length: json.length,
    };
    chunkValues[key] = JSON.stringify(superKey);
    this.cache.putAll(chunkValues, expirationInSeconds);
  }
  /**
   * Removes an entry from the cache using the given key.
   *
   * @returns {null}
   */
  remove(key) {
    const superKeyjson = this.cache.get(key);
    if (superKeyjson !== null) {
      const superKey = JSON.parse(superKeyjson);
      this.cache.removeAll([...superKey.chunks, key]);
    }
    return null;
  }
}

/**
 * Using the Google Apps Script Cache Service for blobs
 */
class BlobCache extends ChunkyCache {
  /**
   * Extends of ChunkyCache
   */
  constructor(cache) {
    super(cache);
    this.splitter = '1c16c2eb-a4a7-4cac-bf79-064cedfbb346';
    this.defaultName = '772fff0c-4207-4893-834c-aec73c498eeb';
    this.prefixSize = 250;
  }
  /**
   * Adds a key/blob pair to the cache.
   *
   * @param {string} key
   * @param {GoogleAppsScript.Base.Blob | GoogleAppsScript.Base.BlobSource} blob
   * @param {number} expirationInSeconds
   */
  putBlob(key, blob, expirationInSeconds = 600) {
    let name = blob.getName();
    if (name === null) name = this.defaultName;
    const contentType = blob.getContentType();
    const prefix = [name, this.splitter, contentType, this.splitter].join('').padEnd(this.prefixSize, ' ');
    const data = prefix + Utilities.base64Encode(blob.getBytes());
    this.put(key, data, expirationInSeconds);
  }
  /**
   * Gets the cached blob for the given key, or null if none is found.
   *
   * @param {*} key
   */
  getBlob(key) {
    const data = this.get(key);
    if (data !== null) {
      const prefix = data.slice(0, this.prefixSize).split(this.splitter);
      const blob = Utilities.newBlob('');
      blob.setBytes(Utilities.base64Decode(data.slice(this.prefixSize)));
      if (prefix[0] !== this.defaultName) blob.setName(prefix[0]);
      blob.setContentType(prefix[2]);
      return blob;
    }
    return null;
  }
}
