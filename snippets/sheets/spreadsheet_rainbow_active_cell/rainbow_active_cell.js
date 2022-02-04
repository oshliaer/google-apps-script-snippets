/**
 * Paints the active cell text in rainbow colors.
 * @return {undefined}
 */

/* exported rainbowActiveCell */
/* global hslToHex */
/**
 *
 */
function rainbowActiveCell() {
  var cell = SpreadsheetApp.getActiveRange();
  var text = cell.getValue().toString();
  var richTextBuilder = SpreadsheetApp.newRichTextValue();
  richTextBuilder.setText(text);
  for (var i = 0; i < text.length; i++) {
    var textStyleBuilder = SpreadsheetApp.newTextStyle();
    textStyleBuilder.setForegroundColor(hslToHex(((360 * i) / text.length) | 0, 100, 50));
    var textStyle = textStyleBuilder.build();
    richTextBuilder.setTextStyle(i, i + 1, textStyle);
  }
  var value = richTextBuilder.build();
  cell.setRichTextValue(value);
}
