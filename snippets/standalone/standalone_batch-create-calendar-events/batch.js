// https://gist.github.com/tanaikech/f167b9280a8e710804e4061571b53fb9
function main() {
  var body = [
    {
      method: 'POST',
      endpoint: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      requestBody: {
        end: { date: '2019-02-18' },
        start: { date: '2019-02-18' },
      },
    },
  ];

  var url = 'https://www.googleapis.com/batch';
  var boundary = 'xxxxxxxxxx';
  var contentId = 0;
  var data = body.reduce(function (p, c) {
    p += 'Content-Type: application/http\r\n';
    p += 'Content-ID: ' + ++contentId + '\r\n\r\n';
    p += c.method + ' ' + c.endpoint + '\r\n';
    p += c.requestBody ? 'Content-Type: application/json; charset=utf-8\r\n\r\n' : '\r\n';
    p += c.requestBody ? JSON.stringify(c.requestBody) + '\r\n' : '';
    p += '--' + boundary + '\r\n';
    return p;
  }, '--' + boundary + '\r\n');

  // for (var i in body) {

  // }
  var payload = Utilities.newBlob(data).getBytes();
  var options = {
    method: 'post',
    contentType: 'multipart/mixed; boundary=' + boundary,
    payload: payload,
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
    muteHttpExceptions: true,
  };
  var res = UrlFetchApp.fetch(url, options).getContentText();
  Logger.log(res);
}
