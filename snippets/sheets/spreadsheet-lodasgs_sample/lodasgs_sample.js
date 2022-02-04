/**
 *
 */
function run() {
  const dataRange = SpreadsheetApp.getActiveSheet().getDataRange();
  dataRange.setValues(dataRange.getValues().map((row) => row.sort()));
}

/**
 *
 */
function shuffleActiveRange() {
  /**
   * @type {import("lodash").LoDashStatic}
   */
  const _ = LodashGS.load();

  const activeRange = SpreadsheetApp.getActiveRange();
  activeRange.setValues(_.shuffle(activeRange.getValues().map((row) => _.shuffle(row))));
}

const onOpen = () =>
  SpreadsheetApp.getUi().createMenu('DoIt').addItem('Run', 'run').addItem('Shuffle', 'shuffleActiveRange').addToUi();
