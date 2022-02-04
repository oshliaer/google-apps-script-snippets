/**
 * @file getting Videos from Youtube with IDs
 */

/* exported userActionRun */

/**
 * User action. Runs the snippet
 */
function userActionRun() {
  var data = [];
  var res = searchByKeyword_('trailers');
  while (res.items.length && data.length < 10) {
    data = data.concat(res.items);
    res = searchByKeyword_('trailers', res.nextPageToken);
  }
  Logger.log(data.length);
  Logger.log(
    '\n%s',
    data
      .map(function (item, i) {
        return Utilities.formatString('%s. %s', i + 1, item.snippet.title);
      })
      .join('\n')
  );
}

/**
 * Returns YouTube search result
 * @param {string} keyword
 * @param {string} nextPageToken
 * @return {object}
 */
function searchByKeyword_(keyword, nextPageToken) {
  var q = { q: keyword, maxResults: '1', type: 'video' };
  if (nextPageToken) q.pageToken = nextPageToken;

  var results = YouTube.Search.list('id,snippet', q);
  return results;
}
