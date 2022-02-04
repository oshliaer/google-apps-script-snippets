/**
 * @file Pass ars to the menu item
 * @url
 * {@see https://qna.habr.com/q/724017}
 */

var MENU = [
  {
    caption: 'Пункт меню 1',
    functionName: 'itemMenu',
  },
  {
    caption: 'Пункт меню 2',
    functionName: 'itemMenu',
  },
  {
    caption: 'Пункт меню 3',
    functionName: 'itemMenu',
  },
];

/**
 *
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  var menu = ui.createMenu('Test');

  MENU.forEach(function (item, i) {
    menu.addItem(item.caption, item.functionName + i);
  });

  menu.addToUi();
}

/**
 *
 * @param {{
 *   item: string,
 *   order: number
 * }} e
 */
function itemMenu(e) {
  var caption = e.item.caption;
  var order = e.order;
  Browser.msgBox(Utilities.formatString('Был нажат %sй пункт меню: %s', order + 1, caption));
}

(function (self) {
  MENU.forEach(function (item, i) {
    self[item.functionName + i] = function () {
      return self[item.functionName]({ item: item, order: i });
    };
  });
})(this);
