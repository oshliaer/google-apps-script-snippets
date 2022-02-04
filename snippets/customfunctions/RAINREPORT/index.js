/**
 * @file
 * @see {@link https://docs.google.com/spreadsheets/d/11Fp2Tx8BGXFxuYd83jzJM4O7Cvow4Sm-sBWAPLTUfEo/edit?usp=sharing}
 * @see {@link https://qna.habr.com/q/777671}
 */

/* exported RAINREPORT */

/**
 * @OnlyCurrentDoc
 */

/**
 *
 * The RAINREPORT function
 *
 * @param {rain} rain Two-column data array
 * @param {boolean} skipEmpty
 * @return {any[][]}
 * @customfunction
 */
function RAINREPORT(rain, skipEmpty = true) {
  const _rain_ = rain.map((row) => row[0]);
  const _cloud_ = rain.map((row) => row[1]);
  const _report_ = {};
  _rain_.forEach((item, i) => {
    if (_cloud_[i] === '' && skipEmpty === true) return;
    if (!Object.prototype.hasOwnProperty.call(_report_, _cloud_[i]))
      _report_[_cloud_[i]] = {
        data: [],
        name: _cloud_[i],
      };
    if (_report_[_cloud_[i]].data.indexOf(item) === -1) _report_[_cloud_[i]].data.push(item);
  });
  return Object.keys(_report_)
    .sort()
    .map((key) => [key, ..._report_[key].data.sort()]);
}
