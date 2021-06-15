var requestManager = require('../request-manager');
var cardModel = require('../models/cardModel');

/**
  * The cards class is the way to store card data of your customers safely to improve the shopping experience.
  * This will allow your customers to complete their purchases much faster and easily, since they will not have to complete their card data again.
  * This class must be used in conjunction with the [Customer class.]{@link https://www.mercadopago.com/developers/en/guides/online-payments/web-tokenize-checkout/customers-and-cards}
  * @namespace card
 */
var card = module.exports = {
  schema: cardModel
};

/**
 * Get all saved cards from a customer
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/get/}
 * @function all
 * @param {string} customer_id Customer ID
 * @memberof card
 */
card.all = requestManager.describe({
  path: '/v1/customers/:customer_id/cards',
  method: 'GET'
});

/**
 * Get card from card's id and customer's id
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/get}
 * @function get
 * @param {string} customer_id Customer ID
 * @param {string} id Card ID
 * @memberof card
 */
card.get = requestManager.describe({
  path: '/v1/customers/:customer_id/cards/:id',
  method: 'GET'
});

/**
 * Get card from card's id and customer's id
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/get/}
 * @function findById
 * @param {string} customer_id Customer ID
 * @param {string} id Card ID
 * @memberof card
 */
card.findById = card.get;

/**
 * Create a new card for provided Customer ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post/}
 * @function create
 * @param {string} customer_id Customer ID
 * @memberof card
 */
card.create = requestManager.describe({
  path: '/v1/customers/:customer_id/cards',
  method: 'POST'
});

/**
 * Create a new card for provided Customer ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/post/}
 * @function create
 * @param {string} customer_id Customer ID
 * @memberof card
 */
card.save = card.create;

/**
 * Update card from customer id
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/put/}
 * @function update
 * @param {string} customer_id Customer ID
 * @param {string} id Card ID
 * @memberof card
 */
card.update = requestManager.describe({
  path: '/v1/customers/:customer_id/cards/:id',
  method: 'PUT'
});

/**
 * Delete card from customer id
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards_id/delete/}
 * @function delete
 * @param {string} customer_id Customer ID
 * @param {string} id Card ID
 * @memberof card
 */
card.delete = requestManager.describe({
  path: '/v1/customers/:customer_id/cards/:id',
  method: 'DELETE'
});
