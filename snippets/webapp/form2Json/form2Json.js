/**
 *
 * @file Parse data that could contain objects nested up to 5 levels deep.
 * It's able to deal with both rather complex data, but not fail to decode a URI as simple as id=213.
 * @author Elias Van Ootegem {@link https://stackoverflow.com/users/1230836/elias-van-ootegem}
 * @see https://stackoverflow.com/a/10881657/1393023
 */

/**
 *
 * @param {string} formString
 * @return {object}
 */
function form2Json(formString) {
  'use strict';
  let obj;
  let i;
  let pt;
  let keys;
  let j;
  let ev;
  if (typeof form2Json.br !== 'function') {
    form2Json.br = function (repl) {
      if (repl.indexOf(']') !== -1) {
        return repl.replace(/\](.+?)(,|$)/g, function ($1, $2, $3) {
          return form2Json.br($2 + '}' + $3);
        });
      }
      return repl;
    };
  }
  formString = '{"' + (formString.indexOf('%') !== -1 ? decodeURIComponent(formString) : formString) + '"}';
  obj = formString.replace(/\=/g, '":"').replace(/&/g, '","').replace(/\[/g, '":{"');
  obj = JSON.parse(
    obj.replace(/\](.+?)(,|$)/g, function ($1, $2, $3) {
      return form2Json.br($2 + '}' + $3);
    })
  );
  pt = ('&' + formString)
    .replace(/(\[|\]|\=)/g, '"$1"')
    .replace(/\]"+/g, ']')
    .replace(/&([^\[\=]+?)(\[|\=)/g, '"&["$1]$2');
  pt = (pt + '"').replace(/^"&/, '').split('&');
  for (i = 0; i < pt.length; i++) {
    ev = obj;
    keys = pt[i].match(/(?!:(\["))([^"]+?)(?=("\]))/g);
    for (j = 0; j < keys.length; j++) {
      if (!Object.prototype.hasOwnProperty.call(ev, keys[j])) {
        if (keys.length > j + 1) {
          ev[keys[j]] = {};
        } else {
          ev[keys[j]] = pt[i].split('=')[1].replace(/"/g, '');
          break;
        }
      }
      ev = ev[keys[j]];
    }
  }
  return obj;
}

/**
 *
 */
function testForm2Json() {
  const contents =
    'orderName=zxx&payment%5Bsys%5D=none&payment%5Bsystranid%5D=0&payment%5Borderid%5D=1705693330&payment%5Bproducts%5D%5B0%5D%5Bname%5D=%D0%9A%D0%B0%D1%80%D0%B0%D0%BD%D0%B4%D0%B0%D1%88%D0%BD%D0%B8%D1%86%D0%B0%2B%D0%A1%D1%82%D0%B0%D0%BA%D0%B0%D0%BD&payment%5Bproducts%5D%5B0%5D%5Bquantity%5D=1&payment%5Bproducts%5D%5B0%5D%5Bamount%5D=790&payment%5Bproducts%5D%5B0%5D%5Bprice%5D=790&payment%5Bamount%5D=790&formid=form189294992&formname=Cart';
  const data = form2Json(contents);
  console.log(JSON.stringify(data.payment.products[0]));
  console.log(JSON.stringify(data));
}
