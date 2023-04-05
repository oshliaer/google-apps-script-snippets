function myFunction() {
  const body = DocumentApp.getActiveDocument().getBody();
  const tables = body.getTables();
  let t1 = undefined;
  let row1 = undefined;
  let cell1 = undefined;
  tables.forEach((table) => {
    t1 = t1 || table.getAttributes();
    table.setAttributes(t1);

    table.setColumnWidth(0, undefined);
    table.setBorderColor('#000000');
    table.setBorderWidth(0);
    // const attrs = {

    // };
    // attrs[DocumentApp.Positioned]
    console.log(table.getAttributes());
    const row = table.getRow(0);
    row1 = row1 || row.getAttributes();
    row.setAttributes(row1);
    console.log(row.getMinimumHeight());
    row.setMinimumHeight(36);
    // row.
    const cell = row.getCell(0);
    cell1 = cell1 || cell.getAttributes();
    cell.setAttributes(cell1);
    cell.setBackgroundColor('#cdf7c1');
    // console.log(cell.getVerticalAlignment().toString());
    cell.setVerticalAlignment(DocumentApp.VerticalAlignment.TOP);
    cell.setPaddingBottom(0).setPaddingTop(0).setPaddingLeft(0).setPaddingRight(0);
  });
}
