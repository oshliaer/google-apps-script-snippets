/**
 *
 * @param {Event} e The onSelectionChange event.
 */
function onSelectionChange(e) {
  try {
    var range = e.range;
    if (range.getNumRows() === 1 && range.getNumColumns() === 1 && range.getCell(1, 1).getValue() === '') {
      range.setBackground(randomColor_());
    }
  } catch (error) {
    console.error(error.message, error);
  }
}

/**
 * @return {string}
 */
function randomColor_() {
  return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
