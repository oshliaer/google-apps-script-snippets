/**
 * Opens the sidebar
 */
function openSidebarDialog() {
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('app/sidebar.html'));
}

/**
 * Opens the modal dialog
 */
function showModalDialog() {
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutputFromFile('app/dialog.html'), 'Modal dialog');
}
