const ID = '1KwT0nq3DriKYhYZFL42aw2IezSd_C1NL0Iuw9gQ76bE';

function myFunction() {
  const f = Sheets.Spreadsheets.get(ID, { fields: 'sheets(properties.sheetId,data.rowData.values)' });
  const start = getStart_(f.sheets[0]);
  console.log(start);
  const pt = f.sheets[0].data[0].rowData[start.rowIndex].values[start.columnIndex].pivotTable;
  const req = collapsedAll_(pt, true);
  console.log(JSON.stringify(pt, null, ' '), start);
  const r = Sheets.Spreadsheets.batchUpdate(
    {
      requests: [
        {
          updateCells: {
            rows: {
              values: [
                {
                  pivotTable: req,
                },
              ],
            },
            start,
            fields: '*',
          },
        },
      ],
    },
    ID
  );
  console.log(JSON.stringify(r));
}

function getStart_(sheet) {
  const sheetId = sheet.properties.sheetId;
  const rowIndex = sheet.data[0].rowData.findIndex((rd) => rd.values && rd.values.some((v) => v.pivotTable));
  const columnIndex = sheet.data[0].rowData[rowIndex].values.findIndex((rd) => rd.pivotTable);
  return {
    sheetId,
    rowIndex,
    columnIndex,
  };
}

function collapsedAll_(pt, bool) {
  const pt_ = Object.assign({}, pt);
  if (pt_.rows)
    pt_.rows.forEach((row, i) => {
      if (row.valueMetadata) pt_.rows[i].valueMetadata = row.valueMetadata.map((md) => ((md.collapsed = bool), md));
    });
  if (pt_.columns)
    pt_.columns.forEach((column, i) => {
      if (column.valueMetadata)
        pt_.columns[i].valueMetadata = column.valueMetadata.map((md) => ((md.collapsed = bool), md));
    });
  return pt_;
}
