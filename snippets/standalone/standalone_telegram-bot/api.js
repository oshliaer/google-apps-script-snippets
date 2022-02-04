function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

function setWebhook() {
  var uf = UrlFetchApp.fetch(api('setWebhook') + '?url=' + getScriptURL());
}

function disableWebhook() {
  var uf = UrlFetchApp.fetch(api('setWebhook') + '?url=');
}

function getApiKey() {
  return PropertiesService.getScriptProperties().getProperty('apikey');
}
