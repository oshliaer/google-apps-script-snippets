/**
 *
 *
 */
function getData() {
  const values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  const headers = values.shift();
  const data = values.reduce((p, c) => {
    const entry = c.reduce((o, v, j) => {
      if (headers[j]) o[headers[j]] = v;
      return o;
    }, {});
    p.push(entry);
    return p;
  }, []);
  console.log(data);
}
