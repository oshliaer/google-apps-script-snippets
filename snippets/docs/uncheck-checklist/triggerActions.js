/**
 * Creates the user menu for handy use.
 */
function onOpen() {
  DocumentApp.getUi().createMenu('Checklists').addItem('Mark the list as its last item', 'run').addToUi();
}
