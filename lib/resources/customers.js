var requestManager = require('../request-manager');
var customerModel = require('../models/customersModel');

/**
  * This class allows you to store customers data safely to improve the shopping experience.
  * This will allow your customer to complete their purchases much faster and easily when used in conjunction with the Cards class.
  * [Customer class.]{@link https://www.mercadopago.com.br/developers/en/guides/online-payments/web-tokenize-checkout/customers-and-cards}
  * @namespace customers
 */
var customers = module.exports = {
  schema: customerModel,
  cards: {}
};

/**
 * Get all customers
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/customers/_customers_search/get/}
 * @function search
 * @memberof customers
 */
customers.search = requestManager.describe({
  path: '/v1/customers/search',
  method: 'GET'
});

/**
 * Create a customer
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/customers/_customers/post/}
 * @function create
 * @memberof customers
 */
customers.create = requestManager.describe({
  path: '/v1/customers',
  method: 'POST'
});

customers.save = customers.create;

/**
 * Update a Customer
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/customers/_customers_id/put/}
 * @function update
 * @memberof customers
 */
customers.update = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'PUT'
});

/**
 * Get a customer by id
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/customers/_customers_id/get/}
 * @function get
 * @param {string} id Customer ID
 * @memberof customers
 */
customers.get = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'GET'
});

customers.findById = customers.get;

/**
 * Remove a customer by id
 * [Click here for more infos](https://www.mercadopago.com.br/developers/en/reference/cards/_customers_customer_id_cards_id/delete/)
 * @function remove
 * @param {string} id Customer ID
 * @memberof customers
 */
customers.remove = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'DELETE'
});

customers.cards.all = requestManager.describe({
  path: '/v1/customers/:id/cards',
  method: 'GET'
});

customers.cards.create = requestManager.describe({
  path: '/v1/customers/:id/cards',
  method: 'POST'
});

customers.cards.save = customers.cards.create;

customers.cards.update = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'PUT'
});

customers.cards.get = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'GET'
});

customers.cards.findById = customers.cards.get;

customers.cards.delete = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'DELETE'
});
