/**
 * @file Hides empty columns on a sheet
 * @url
 * {@see https://support.google.com/docs/thread/32181934}
 */

/**
 * Run snippet
 */
function renameToYeaer() {
  renameToCurrentYear_('22');
}

/**
 *
 * @param {string} year
 */
function renameToCurrentYear_(year) {
  const listOfNamesPatts = [...new Array(12)]
    .map((_, i) =>
      new Date(new Date().setMonth(i)).toLocaleString('default', {
        month: 'short',
      })
    )
    .map((name) => new RegExp(`(${name}) (\\d{2})`));
  SpreadsheetApp.getActive()
    .getSheets()
    .forEach((sheet) => {
      const name = sheet.getName();
      let match = undefined;
      const patt = listOfNamesPatts.find((patt) => {
        const match_ = name.match(patt);
        if (match_) {
          match = match_;
          return true;
        }
      });
      if (match && match[2] !== year) sheet.setName(name.replace(match[0], `${match[1]} ${year}`));
    });
}
