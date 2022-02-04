/**
 * Converts a HSL color value to RGB or HEX.
 * Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space
 * The snippet based on https://stackoverflow.com/a/44134328/1393023
 *
 * @param {number} h The hue
 * @param {number} s The saturation
 * @param {number} l The lightness
 * @return {string} The HEX representation
 */

var hslToHex = function (h, s, l) {
  var hue2rgb = function (p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  var toHex = function (x) {
    var hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  (h /= 360), (s /= 100), (l /= 100);
  var r;
  var g;
  var b;
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return '#' + [r, g, b].map(toHex).join('');
};
