function run() {
  const book = SpreadsheetApp.getActive();
  const range1 = book.getRange('Sheet1!B4');
  const range2 = book.getRange('Sheet1!B6');

  const joinRichTextValue = new JoinRichTextValue();
  joinRichTextValue.separator = { text: '\n' };
  joinRichTextValue.push(range1.getRichTextValue());
  joinRichTextValue.push(range2.getRichTextValue());

  const range = book.getRange('Sheet1!B16');
  range.setRichTextValue(joinRichTextValue.build());
}
