/* global GCP */
/**
 *
 */
function logPrinters() {
  var params = {
    connection_status: 'ONLINE',
  };

  var printers = new GCP().search(params);

  console.log(JSON.stringify(printers.printers, null, ' '));
}

/**
 *
 */
function printFile() {
  const printerid = '__google__docs';
  const content = DriveApp.getFileById('13czHxp49MFMoV2in32LkoflLupI1pucidj4ceBpKZos').getBlob();
  const title = Utilities.formatString('%s %s', printerid, new Date().getTime());
  //  var ticket = {
  //    version: '1.0',
  //    print: {
  //      color: {
  //        type: 'STANDARD_COLOR',
  //        vendor_id: 'Color'
  //      },
  //      duplex: {
  //        type: 'NO_DUPLEX'
  //      }
  //    }
  //  };

  const params = {
    printerid,
    title,
    content,
    //    'contentType': 'application/pdf',
    //    'ticket'    : JSON.stringify(ticket)
  };

  const res = new GCP().submit(params);

  console.log(JSON.stringify(res, null, ' '));
}
