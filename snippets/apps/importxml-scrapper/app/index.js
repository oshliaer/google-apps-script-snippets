/* exported ImportxmlScrapper */
/**
 *
 */
class ImportxmlScrapper {
  /**
   * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} book
   */
  constructor(book) {
    this.book = book;
    this.data = this.book.getSheetByName('Data');
    this.inproc = this.book.getSheets().find((sheet) => /\[inproc\]/i.test(sheet.getName()));
  }
  /**
   *
   */
  init() {
    const sheet = this.data.copyTo(this.book);
    sheet
      .createTextFinder('^s*=s*(.*IMPORTXMLs*().*)')
      .useRegularExpression(true)
      .matchFormulaText(true)
      .replaceAllWith('_=$1');
    sheet.setName(`[inproc] ${new Date().toLocaleString('ru')}`);
  }
  /**
   * @return {GoogleAppsScript.Spreadsheet.Sheet}
   */
  scrape({ counter = 50 }) {
    let _counter_ = counter;
    const current = this.book.getSheets().find((sheet) => /\[inproc\]/i.test(sheet.getName()));

    if (!current) return undefined;

    const substFinder = current.createTextFinder('^_=').useRegularExpression(true);
    if (substFinder.findAll().length) {
      while (substFinder.findNext() && --_counter_) substFinder.replaceWith('=');
      SpreadsheetApp.flush();
      const dr = current.getDataRange();
      dr.setValues(dr.getValues());
    } else current.setName(current.getName().replace(/\[inproc\]/i, '[done]'));
    return current;
  }
}
