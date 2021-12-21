var requestManager = require('../request-manager');

var paymentMethods = module.exports = {}

/**
 * Get payment methods
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/payment_methods/_payment_methods/get/}
 * @function listAll
 * @memberof paymentMethods
 */
paymentMethods.listAll = requestManager.describe({
  path: '/v1/payment_methods',
  method: 'GET'
});