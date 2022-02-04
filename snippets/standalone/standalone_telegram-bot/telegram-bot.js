function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  try {
    //log([JSON.stringify(e), JSON.stringify(contents)]);
    actions(contents);
  } catch (err) {
    var params = {
      chat_id: contents.message.chat.id,
      text: err.message,
    };
    sendMessage(params);
  }
}

function actions(contents) {
  var cmd = contents.message.text.split(' ')[0];
  var param = contents.message.text.split(' ')[1];
  var text = '';
  var params = {};
  params.chat_id = contents.message.chat.id;
  switch (cmd) {
    case '/get':
      text = readLastRow();
      break;
    case '/getr':
      text = getValuesOfRange(param);
      break;
    case '/start':
      text = getInstructions();
      break;
    case '/help':
      text = getInstructions();
      break;
    default:
      appendRow(contents.message.text);
  }

  if (text == '') return;
  params.text = text;
  sendMessage(params);
}

function api(METHOD_NAME) {
  console.log(['https://api.telegram.org/bot' + getApiKey() + '/' + METHOD_NAME]);
  return 'https://api.telegram.org/bot' + getApiKey() + '/' + METHOD_NAME;
}

function sendMessage(params) {
  var uf = UrlFetchApp.fetch(api('sendMessage') + '?' + params.serialize(), {
    muteHttpExceptions: true,
  });
}

Object.prototype.serialize = function () {
  var str = [];
  for (var p in this)
    if (this.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(this[p]));
    }
  return str.join('&');
};

function getInstructions() {
  var text = '';
  text += 'Этот бот - пример' + '\n';
  text += 'Все запросы записываются в Таблицу';
  return text;
}
