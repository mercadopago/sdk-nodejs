var moment = require('moment');

var mercadopagoDate = function mercadopagoDate() {
  if (arguments.length === 1) {
    this.date = moment(arguments[0]);
  } else if (arguments.length === 2) {
    this.date = moment(arguments[0], arguments[1]);
  } else {
    this.date = moment();
  }
};

/**
 * Converts a mercadopagoDate to ISO_8601 String equivalent
 */
mercadopagoDate.prototype.toString = function (utc) {
  if (utc !== undefined && (typeof utc === 'number')) return this.date.utc(utc).format(mercadopagoDate.ISO_8601);
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
  this.date.add(days, 'day');
  return this;
};

/**
 * Substract days to a mercadopagoDate
 * @param days
 * @returns {mercadopagoDate}
 */
mercadopagoDate.prototype.subtract = function (days) {
  this.date.subtract(days, 'day');
  return this;
};

/**
 * ISO_8601 format for moment library
 * @type {string}
 */
mercadopagoDate.ISO_8601 = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

module.exports = mercadopagoDate;
