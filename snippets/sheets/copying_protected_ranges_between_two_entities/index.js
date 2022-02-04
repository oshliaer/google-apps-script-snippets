/* exported run */

/** @constant {string} FROM_ID */
const FROM_ID = '1b1nu0CjGDhFXCVIgvcdAOnsbJiy8VcZW-c6B5iF4iN8';

/** @constant {string} TO_ID */
const TO_ID = '1lHyGj9D_EzS5zZuC0mcZ822nb_-nJmmEzibJSGQDlls';

/**
 * Runs the example
 * @ignore
 */
function run() {
  console.log(copyingAccessRightsBetweenTwoEntities_(FROM_ID, TO_ID));
}

/**
 * Copying access rights between two entities
 * The Sheets must be copied one from the other!
 * @param {string} fromId an entity id
 * @param {string} toId an entity id
 * @return {void}
 */
function copyingAccessRightsBetweenTwoEntities_(fromId, toId) {
  const fromProtectedRanges = Sheets.Spreadsheets.get(fromId, {
    fields: 'sheets(properties.sheetId,properties.title,protectedRanges)',
  }).sheets.reduce((p, sheet) => {
    if (sheet.protectedRanges && sheet.protectedRanges.length)
      p.push(
        ...sheet.protectedRanges.map((protectedRange) => {
          protectedRange.sheetTitle = sheet.properties.title;
          delete protectedRange.protectedRangeId;
          return protectedRange;
        })
      );
    return p;
  }, []);

  const toDict = {};
  const requestsDeleteProtectedRanges = Sheets.Spreadsheets.get(toId, {
    fields: 'sheets(properties.sheetId,properties.title,protectedRanges.protectedRangeId)',
  }).sheets.reduce((p, sheet) => {
    toDict[sheet.properties.title] = sheet.properties.sheetId;
    const protectedRangeIds = sheet.protectedRanges
      ? sheet.protectedRanges
          .map((protectedRange) =>
            protectedRange && protectedRange.protectedRangeId
              ? {
                  deleteProtectedRange: {
                    protectedRangeId: protectedRange.protectedRangeId,
                  },
                }
              : undefined
          )
          .filter((protectedRangeId) => protectedRangeId)
      : [];
    p.push(...protectedRangeIds);
    return p;
  }, []);

  if (requestsDeleteProtectedRanges.length)
    Sheets.Spreadsheets.batchUpdate(
      {
        requests: requestsDeleteProtectedRanges,
      },
      toId
    );

  const requestsAddProtectedRanges = fromProtectedRanges.reduce((p, protectedRange) => {
    if (protectedRange.range && toDict[protectedRange.sheetTitle]) {
      protectedRange.range.sheetId = toDict[protectedRange.sheetTitle];
      delete protectedRange.sheetTitle;
      p.push({ addProtectedRange: { protectedRange } });
    }
    return p;
  }, []);

  if (requestsAddProtectedRanges.length)
    Sheets.Spreadsheets.batchUpdate(
      {
        requests: requestsAddProtectedRanges,
      },
      toId
    );
}
