/**
 * Runs the snippet
 */
function run() {
  pasteTextToSelection_(new Date().toISOString().split('T')[0]);
}

/**
 * Paste the text to selection
 * @param {string} text
 */
function pasteTextToSelection_(text) {
  var doc = DocumentApp.getActiveDocument();
  var selection = doc.getSelection();
  if (selection) {
    var rEls = selection.getRangeElements();
    rEls.forEach(function (rEl) {
      var element = rEl.getElement();
      switch (element.getType()) {
        case DocumentApp.ElementType.TEXT:
          element.asText().deleteText(rEl.getStartOffset(), rEl.getEndOffsetInclusive());
          break;
        case DocumentApp.ElementType.PARAGRAPH:
          element.removeFromParent();
          break;
        case DocumentApp.ElementType.TABLE_CELL:
          element.asText().setText('');
          break;
      }
    });

    selection
      .getRangeElements()[0]
      .getElement()
      .asText()
      .insertText(selection.getRangeElements()[0].getStartOffset(), text);
  } else {
    Logger.log('There is no a selection');
  }
}
