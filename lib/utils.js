var MercadoPagoDate = require('./utils/mercadopagoDate');

var utils = module.exports = {
  date: {}
};

/**
 * Returns a new MercadoPagoDate
 * @returns {mercadopagoDate}
 */
utils.date.now = function () {
  return new MercadoPagoDate();
};

/**
 * Returns a new MercadoPagoDate and creates it using a Date Object or a string with an specific format
 * @param userDate
 * @returns {mercadopagoDate}
 */
utils.date.from = function (userDate) {
  if (userDate === undefined) {
    throw new Error('You need to specified a date');
  }

  if ((typeof userDate === 'object') && (userDate instanceof Date)) {
    return new MercadoPagoDate(userDate);
  } else if (typeof userDate === 'string') {
    if (/[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(userDate)) {
      return new MercadoPagoDate(userDate, 'YYYY-MM-DD');
    } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(userDate)) {
      return new MercadoPagoDate(userDate, 'YYYY-MM-DDTHH:mm:ss');
    } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}[-|+][0-9]{2}:[0-9]{2}$/.test(userDate)) {
      return new MercadoPagoDate(userDate, MercadoPagoDate.ISO_8601);
    }
  }

  throw new Error('Invalid date sent');
};
