var requestManager = require('../request-manager');
var cardTokenModel = require('../models/cardTokenModel');

/**
  * This class will allow you to send your customers card data for Mercado Pagos server and receive a token to complete the payments transactions.
  * @namespace cardToken
 */
var cardToken = module.exports = {
  schema: cardTokenModel
};

/**
 * Get card token for provided id
 * @function get
 * @param {string} id token id
 * @memberof cardToken
 */
cardToken.get = requestManager.describe({
  path: '/v1/card_tokens/:id',
  method: 'GET'
});

cardToken.findById = cardToken.get;

/**
 * Get card token for provided id
 * @function create
 * @memberof cardToken
 */
cardToken.create = requestManager.describe({
  path: '/v1/card_tokens',
  method: 'POST'
});

cardToken.save = cardToken.create;
