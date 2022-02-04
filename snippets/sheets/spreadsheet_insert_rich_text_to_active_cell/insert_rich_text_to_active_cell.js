/* exported insertRichTextToActiveCell, insertRichTextToActiveCellByCondition */

/**
 * Inserts the rich text to the cell.
 * @return {undefined}
 */
function insertRichTextToActiveCell() {
  var range = SpreadsheetApp.getActive().getActiveCell();
  range.clearFormat();
  range.setFontSize(18);

  var textStyleBuilder = SpreadsheetApp.newTextStyle();
  textStyleBuilder.setForegroundColor('red');
  var textStyle = textStyleBuilder.build();

  var richTextBuilder = SpreadsheetApp.newRichTextValue();
  richTextBuilder.setText('Форматирование текста в ячейке. RichText');
  richTextBuilder.setTextStyle(textStyle);
  var value = richTextBuilder.build();

  range.setRichTextValue(value);
}

/**
 *
 */
function insertRichTextToActiveCellByCondition() {
  var range = SpreadsheetApp.getActive().getActiveCell();
  range.clearFormat();
  range.setFontSize(18);

  var stylesNames = ['italic', 'bold', 'strike'];

  var styleName = stylesNames[Math.floor(Math.random() * stylesNames.length)];

  var textStyleBuilder = SpreadsheetApp.newTextStyle();
  switch (styleName) {
    case 'italic':
      textStyleBuilder.setItalic(true);
      break;
    case 'bold':
      textStyleBuilder.setBold(true);
      break;
    case 'strike':
      textStyleBuilder.setStrikethrough(true);
      break;
  }
  var textStyle = textStyleBuilder.build();

  var richTextBuilder = SpreadsheetApp.newRichTextValue();
  var text = 'Some text ' + styleName;
  richTextBuilder.setText(text);
  richTextBuilder.setTextStyle(text.length - styleName.length, text.length, textStyle);
  var value = richTextBuilder.build();

  range.setRichTextValue(value);
}
