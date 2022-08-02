/**
 * @typedef {{
 *  linkUrl: string;
 *  text: string;
 *  textStyle: GoogleAppsScript.Spreadsheet.TextStyle;
 *  length: number;
 * }} RichTextValueDecomp
 */

class JoinRichTextValue {
  constructor() {
    /** @type { RichTextValueDecomp[] } */
    this._decomps = [];
    /** @type { RichTextValueDecomp } */
    this._separator = {
      linkUrl: undefined,
      text: '',
      textStyle: undefined,
      length: 0,
    };
  }
  /**
   * @param { RichTextValueDecomp } separator
   * @returns { void }
   */
  set separator(separator) {
    Object.assign(this._separator, separator);
    this._separator.length = this._separator.text.length;
  }
  /**
   * @param { GoogleAppsScript.Spreadsheet.RichTextValue } richTextValue
   * @returns { RichTextValueDecomp }
   */
  decomp(richTextValue) {
    return richTextValue.getRuns().map((item) => ({
      linkUrl: item.getLinkUrl(),
      text: item.getText(),
      textStyle: item.getTextStyle(),
      length: item.getEndIndex() - item.getStartIndex(),
    }));
  }
  /**
   * @param { GoogleAppsScript.Spreadsheet.RichTextValue } richTextValue
   * @returns { void }
   */
  push(richTextValue) {
    this._decomps.push(...this.decomp(richTextValue), Object.assign({}, this._separator));
  }
  /**
   * @returns { GoogleAppsScript.Spreadsheet.RichTextValueBuilder }
   */
  getBuilder() {
    /** @type { RichTextValueDecomp[] } */
    const decomps = this._decomps.slice(0, this._decomps.length - 1);
    const richTextValueBuilder = SpreadsheetApp.newRichTextValue();
    const text = decomps.map((richTextValueDecomp) => richTextValueDecomp.text).join('');
    richTextValueBuilder.setText(text);
    const carriage = {
      startIndex: 0,
      endIndex: 0,
    };
    decomps.forEach((richTextValueDecomp) => {
      if (richTextValueDecomp.length > 0) {
        carriage.endIndex = carriage.startIndex + richTextValueDecomp.length;
        richTextValueBuilder.setTextStyle(carriage.startIndex, carriage.endIndex, richTextValueDecomp.textStyle);
        if (richTextValueDecomp.linkUrl) {
          richTextValueBuilder.setLinkUrl(carriage.startIndex, carriage.endIndex, richTextValueDecomp.linkUrl);
        }
        carriage.startIndex = carriage.endIndex;
      }
    });
    return richTextValueBuilder;
  }
  /**
   * @returns { GoogleAppsScript.Spreadsheet.RichTextValue }
   */
  build() {
    return this.getBuilder().build();
  }
}
