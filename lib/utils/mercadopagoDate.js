var dayjs = require("dayjs");
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

var mercadopagoDate = function mercadopagoDate() {
  if (arguments.length === 1) {
    this.date = dayjs(arguments[0]);
  } else if (arguments.length === 2) {
    this.date = dayjs(arguments[0], arguments[1]);
  } else {
    this.date = dayjs();
  }
};

/**
 * Converts a mercadopagoDate to ISO_8601 String equivalent
 */
mercadopagoDate.prototype.toString = function (utc) {
  if (utc !== undefined && typeof utc === "number") {
    return this.date.utcOffset(utc).format(mercadopagoDate.ISO_8601);
  }
  return this.date.format(mercadopagoDate.ISO_8601);
};

/**
 * Converts a mercadopagoDate into a Date object
 * @returns {Date|*}
 */
mercadopagoDate.prototype.toDate = function () {
  return this.date.toDate();
};

/**
 * Add days to a mercadopagoDate
 * @param days
 * @returns {mercadopagoDate}
 */
mercadopagoDate.prototype.add = function (days) {
  this.date = this.date.add(days, "day");
  return this;
};

/**
 * Subtract days from a mercadopagoDate
 * @param days
 * @returns {mercadopagoDate}
 */
mercadopagoDate.prototype.subtract = function (days) {
  this.date = this.date.subtract(days, "day");
  return this;
};

/**
 * ISO_8601 format for dayjs library
 * @type {string}
 */
mercadopagoDate.ISO_8601 = "YYYY-MM-DDTHH:mm:ss.SSSZ";

module.exports = mercadopagoDate;
