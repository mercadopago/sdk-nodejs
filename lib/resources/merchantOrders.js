var requestManager = require('../request-manager');
var merchantOrdersModel = require('../models/merchantOrdersModel');

/**
  * This class will allow you to create and manage your orders. You can attach one or more payments in your merchant order.
  * @namespace merchantOrders
 */
var merchantOrders = module.exports = {
  schema: merchantOrdersModel
};

/**
 * Create a Merchant Order
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/merchant_orders/_merchant_orders/post/}
 * @function create
 * @memberof merchantOrders
 */
merchantOrders.create = requestManager.describe({
  path: '/merchant_orders',
  method: 'POST'
});

merchantOrders.save = merchantOrders.create;

/**
 * Update a Merchant Order
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/merchant_orders/_merchant_orders_id/put/}
 * @function update
 * @memberof merchantOrders
 */
merchantOrders.update = requestManager.describe({
  path: '/merchant_orders/:id',
  method: 'PUT'
});

/**
 * Get a Merchant Order by ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/cards/_customers_customer_id_cards/get/}
 * @function get
 * @param {string} id Merchant ID
 * @memberof merchantOrders
 */
merchantOrders.get = requestManager.describe({
  path: '/merchant_orders/:id',
  method: 'GET'
});

merchantOrders.findById = merchantOrders.get;
