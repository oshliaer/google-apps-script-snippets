# Google Apps Script snippets

This is a list of code fragments for the copy / paste tool on yours keyboard. I still don't know what to do about this. It would be great if you had an idea.

<!-- TOC depthFrom:2 -->

- [Base Services](#base-services)
  - [Logger](#logger)
    - [Pretty JSON in Logger](#pretty-json-in-logger)
- [DriveApp](#driveapp)
  - [Basic file manipulations](#basic-file-manipulations)
    - [Create a spreadsheet in the specific folder](#create-a-spreadsheet-in-the-specific-folder)
- [Spreadsheets](#spreadsheets)
  - [Common snippets for spreadsheets](#common-snippets-for-spreadsheets)
    - [Round to day](#round-to-day)
  - [Sheets](#sheets)
    - [Get a sheet by index](#get-a-sheet-by-index)
    - [Get a sheet by name](#get-a-sheet-by-name)
    - [Get sheet by gid](#get-sheet-by-gid)
    - [Get sheets associated with a Form](#get-sheets-associated-with-a-form)
    - [Removes rows from a sheet according to the condition](./Spreadsheets/deleteRows.md)
  - [Values and data](#values-and-data)
    - [Append values to a sheet](#append-values-to-a-sheet)
    - [Insert values starting with row/column](#insert-values-starting-with-rowcolumn)
    - [copyTo](#copyto)
- [Groups](#groups)
  - [Check email in group](#check-email-in-group)
- [Utilities](#utilities)
  - [Blob](#blob)
    - [Create a new Blob object from a string, content type, name and specific charsets](#create-a-new-blob-object-from-a-string-content-type-name-and-specific-charsets)
  - [DigestAlgorithm](#digestalgorithm)
    - [Compute a hash string](#compute-a-hash-string)
- [HtmlService](#htmlservice)
  - [Web application](#web-application)
    - [Responsive meta tag for the webapp](#responsive-meta-tag-for-the-webapp)
    - [Google Site Verification for the webapp](#google-site-verification-for-the-webapp)
    - [Hide Google security warnings](#hide-google-security-warnings)
    - [Processing of POST data](#processing-of-post-data)
- [License](#license)

<!-- /TOC -->

## Base Services

### Logger

#### Pretty JSON in Logger

_example [/issues/3](../../issues/3)_

```js
function ll_() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args.push(typeof arguments[i] === 'object' ? '' + JSON.stringify(arguments[i], null, '  ') : '' + arguments[i]);
  }
  if (!/%s/.test(args[0])) {
    args.unshift(new Array(args.length).join('\n%s'));
  }
  Logger.log.apply(Logger, args);
}
```

## DriveApp

### Basic file manipulations

#### Create a spreadsheet in the specific folder

```js
function example() {
  createSpreadsheet('asdasd', '0Bztea6vSatozM2NiWGVGRzNvbTQ');
  // Defaults
  // createSpreadsheet('asdasdfasdf');
}

function createSpreadsheetRC(name, rows, columns, folder, add) {
  var args = [name];
  if (rows || columns) {
    args.push(rows || 1);
    args.push(columns || 1);
  }

  var spreadsheet = SpreadsheetApp.create.apply(SpreadsheetApp, args);

  if (folder) {
    folder = typeof folder === 'object' ? folder : DriveApp.getFolderById(folder);
    add = !!add;

    var child = DriveApp.getFileById(spreadsheet.getId());

    folder.addFile(child);
    if (!add) {
      DriveApp.getRootFolder().removeFile(child);
    }
  }
  return spreadsheet;
}

function createSpreadsheet(name, folder, add) {
  return createSpreadsheetRC(name, undefined, undefined, folder, add);
}
```

## Spreadsheets

### Common snippets for spreadsheets

#### Round to day

```js
// Rounds the date to days. Usefull for timestamps
function roundToDay_(date, offsetOfDays) {
  offsetOfDays = offsetOfDays * 24 * 60 * 60 * 1000 || 0;
  var res_ = new Date(date.valueOf() + offsetOfDays);
  res_.setHours(0, 0, 0, 0);
  return res_;
}
```

### Sheets

#### Get a sheet by index

```js
/**
  Returns the sheet by index
  @param {number} index A positive integer
*/
var sheet = spreadsheet.getSheets()[index];
```

#### Get a sheet by name

```js
//Always returns a sheet
function getSheetByName(spreadsheet, sheetName) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  return sheet || spreadsheet.insertSheet(sheetName);
}
```

#### Get sheet by gid

```js
function getSheetByGid(spreadsheet, gid) {
  gid = +gid || 0;
  var res_ = undefined;
  var sheets_ = spreadsheet.getSheets();
  for (var i = sheets_.length; i--; ) {
    if (sheets_[i].getSheetId() === gid) {
      res_ = sheets_[i];
      break;
    }
  }
  return res_;
}
```

#### Get sheets associated with a Form

```js
/*
@denial Gets not associated
*/
function getAssociatedWithForm_(sheets, denial) {
  denial = !denial;
  return sheets.filter(
    function (sheet) {
      return !!sheet.getFormUrl() === this.denial;
    },
    { denial: denial }
  );
}
```

### Values and data

#### Append values to a sheet

like [appendRow(rowContents)](<https://developers.google.com/apps-script/reference/spreadsheet/sheet#appendRow(Object)>)

```js
// Appends values to sheet
function appendValues(sheet, values, colOffset) {
  colOffset = colOffset || 1;
  return sheet.getRange(sheet.getLastRow() + 1, colOffset, values.length, values[0].length).setValues(values);
}
```

#### Insert values starting with row/column

```js
// Can be expanded by other methods
function setValues(sheet, values, row, col) {
  row = row || 1;
  col = col || 1;
  sheet.getRange(row, col, values.length, values[0].length).setValues(values);
}
```

#### copyTo

```js
function fn() {
  var source = SpreadsheetApp.openById('...').getRange('A1');
  var destination = SpreadsheetApp.openById('...').getRange('A1');
  copyTo(source, destination);
}
/*
To avoid 'Target range and source range must be on the same spreadsheet'
*/
function copyTo(source, destination) {
  destination.setValues(source.getValues());
}
```

## Groups

#### Check email in group

```js
function isInGroup_(userEmail, groupEmail, level) {
  level = level || 2;
  try {
    var group = GroupsApp.getGroupByEmail(groupEmail);
    return (
      [GroupsApp.Role.OWNER, GroupsApp.Role.MANAGER, GroupsApp.Role.MEMBER].indexOf(group.getRole(currentUser)) ===
      level
    );
  } catch (err) {
    return false;
  }
}
```

## Utilities

### Blob

#### Create a new Blob object from a string, content type, name and specific charsets

_Example [/issue/9](../../issues/9)_

```js
function newBlobWithCharset(data, contentType, name, charset) {
  return Utilities.newBlob('').setDataFromString(data, charset).setName(name).setContentType(contentType);
}
```

### DigestAlgorithm

#### Compute a hash string

_Example [/issue/8](../../issues/8)_

```js
/**
 * Compute a hash string using the specified digest algorithm on the specified value.
 * @param {String} value The specified value.
 * @param {String} digestAlgorithm The name of Enum DigestAlgorithm: MD2, MD5, SHA_1, SHA_256, SHA_384, SHA_512
 * @param {String} charset The name of Enum Charset: US_ASCII, UTF_8.
 * @return {String} The hash of value.
 */

function hash_(str, digestAlgorithm, charset) {
  charset = charset || Utilities.Charset.UTF_8;
  digestAlgorithm = digestAlgorithm || 'MD5';
  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm[digestAlgorithm], str, charset);
  var __ = '';
  for (i = 0; i < digest.length; i++) {
    //var byte = digest[i];
    //if (byte < 0) byte += 256;
    //var bStr = byte.toString(16);
    var bStr = (digest[i] < 0 ? (digest[i] += 256) : digest[i]).toString(16);
    if (bStr.length == 1) bStr = '0' + bStr;
    __ += bStr;
  }
  return __;
}
```

## HtmlService

### Web application

#### Google Site Verification for the webapp

```js
HtmlService.createHtmlOutput('Hello world')
  //WEBMASTER TOOLS
  .addMetaTag('google-site-verification', '<METATAG_FROM_WEBMASTER_TOOLS>');
```

#### Hide Google security warnings

_On an external host_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
  </head>

  <body>
    <iframe src="https://script.google.com/macros/s/ABCD1234/exec"></iframe>
  </body>
</html>
```

_The webapp_

```js
//This is the magic header that allows this to be done with no particular Google security warnings
function doGet(e) {
  var hs = HtmlService.createTemplateFromFile('html-template')
    .evaluate()
    .setTitle('My App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return hs;
}
```

#### Processing of POST data

```js
function doPost(e) {
  if (!e || !e.postData) {
    e = {};
    e.postData = {
      getDataAsString: function () {
        return {};
      },
    };
  }
  try {
    console.log(JSON.parse(e.postData.getDataAsString()));
  } catch (err) {
    console.err(err);
  }
}
```

## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
