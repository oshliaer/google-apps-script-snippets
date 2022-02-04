/**
 *
 * @param {any} pics
 * @param {Boolean} increase
 */
function PARSEAPINET(pics, increase) {
  return (Array.isArray(pics) ? pics : [[pics]]).map((row) => {
    try {
      const obj = JSON.parse(row[0]);
      if (!!increase === true) return obj.map((pic) => Array(pic[1]).fill(pic[4])).flat();
      else return obj.map((pic) => pic[4]);
    } catch (err) {
      return ['#ERR.PARSEAPINET'];
    }
  });
}
