/**
 * Creates the user menu for handy use.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Reset sheet')
    .addItem('Reset active sheet (ContactPrice example)', 'userActionResetActiveSheetByRangesAddresses')
    .addItem('Reset ranges', 'userActionResetRangesByRangesAddresses')
    .addItem('Reset multiple sheets', 'userActionResetMultipleSheetsByRangesAddresses')
    .addItem('Reset "GSM" columns', 'userActionResetMultipleSheetsBySpecialColumns')
    .addItem('Reset to a specific value', 'userActionResetToSpecificValue')
    .addItem('Make a copy before reset', 'userActionMakeCopyBeforeReset')
    .addToUi();
}
