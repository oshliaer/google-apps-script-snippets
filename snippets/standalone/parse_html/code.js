/**
 * Правило для извлечения данных
 * @typedef {Object} Rule
 * @property {RegExp} patt Регулярное выражение для exec
 * @property {string} placeholder Подстановка для форматированного результата
 */

/**
 * Результат работы извлечения данных
 * @typedef {Object} ExtractItem
 * @property {Array.<string>} data Результат работы exec
 * @property {output} [string] Форматированный результат. Необязательно
 */

/**
 * Запускает пример
 */
function run() {
  const httpResponse = fetch_('https://t.me/googleappsscriptrc');
  const contentText = httpResponse.getContentText();
  const rules = [
    {
      patt: /<img class="tgme_page_photo_image" src="(.*?)">/,
      placeholder: '$1',
    },
    {
      patt: /<div class="tgme_page_title" dir="auto">(.*?)</,
      placeholder: 'Название канала "$1"',
    },
    {
      patt: /<div class="tgme_page_extra">(.*?),?(.*?)</,
      placeholder: '$1, $2',
    },
    {
      patt: /<div class="tgme_page_description" dir="auto">(.*?)<\/div>/,
      placeholder: '$1',
    },
  ];
  const content = cleanContentText_(contentText);
  const extractions = extractText_(rules, content);

  const keys = ['image', 'title', 'users', 'description'];
  const result = extractions.reduce((res, extraction, i) => {
    if (keys[i]) res[keys[i]] = extraction.output;
    return res;
  }, {});

  console.log(JSON.stringify(result, null, ' '));
}

/**
 * Короткая запись для UrlFetchApp.fetch
 * @param {string} url
 * @return {GoogleAppsScript.URL_Fetch.HTTPResponse}
 */
function fetch_(url) {
  return UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}

/**
 * Очищает и упрощает контент для работы
 * @param {string} contentText
 * @return {string}
 */
function cleanContentText_(contentText) {
  return contentText
    .replace(/[\r\n]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([><])\s*/g, '$1');
}

/**
 * Извлекает данные по правилам
 * @param {Array.<Rule>} rules
 * @param {string} content
 * @return {Array.<ExtractItem>}
 */
function extractText_(rules, content) {
  // Текущий контент
  let currentContent = content;
  // Каждое правило возвращает результат
  return rules.map((rule) => {
    // Инициализация результата по умолчанию
    /** @type {ExtractItem} */
    const res = { data: [] };
    // Поиск по правилу
    const regExpExecArray = rule.patt.exec(currentContent);
    // Поиск увенчался успехом?
    if (regExpExecArray) {
      // Запись результата в data
      res.data = [...regExpExecArray];
      // Правило содержит подстановку вывода?
      if (rule.placeholder)
        // Дополнительный форматированный результат
        res.output = rule.placeholder.replace(/\$(\d+)/g, (_, i) => res.data[i]);
      // Обрежем часть контента, в которой уже был произведен поиск
      currentContent = currentContent.slice(regExpExecArray.index);
    }
    // Возвращаем ExtractItem
    return res;
  });
}

/**
 * Выводит в консоль контент веб-страницы
 */
function example() {
  const contentText = UrlFetchApp.fetch('https://t.me/googleappsscriptrc').getContentText();
  const content = contentText
    .replace(/[\r\n]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([><])\s*/g, '$1');
  const regExpExecArray = /<div class="tgme_page_title" dir="auto">(.*?)</.exec(content);
  if (regExpExecArray) console.log(regExpExecArray[1]);
  else console.log('Заголовок не найден');
}
