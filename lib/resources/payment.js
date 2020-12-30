var Promise = require('bluebird');
var requestManager = require('../request-manager');
var paymentModel = require('../models/paymentModel');
var collectionsModule = require('./collections');
var preConditions = require('../precondition');
var refundModule = require('./refund');

/**
 * This class provides the methods to access the API that will allow you to create your own payment experience on your website. From basic to advanced configurations, you control the whole experience.
 * [Payment class]{@link https://www.mercadopago.com.br/developers/en/guides/online-payments/checkout-api/introduction/}
 * @namespace payment
 */
var payment = module.exports = {
  schema: paymentModel,
  idempotency: true,
  partnersHeaders: true
};

/**
 * Create a payment
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/payments/_payments/post/}
 * @function create
 * @memberof payment
 */
payment.create = requestManager.describe({
  path: '/v1/payments',
  method: 'POST'
});

payment.save = payment.create;

/**
 * Update a payment
 * [Click here for more infos]{@link https://www.mercadopago.com.br/developers/en/reference/payments/_payments_id/put/}
 * @function update
 * @memberof payment
 */
payment.update = requestManager.describe({
  path: '/v1/payments/:id',
  method: 'PUT'
});

/**
 * Get a payment by ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/payments/_payments_id/get/}
 * @function get
 * @memberof payment
 */
payment.get = requestManager.describe({
  path: '/v1/payments/:id',
  method: 'GET'
});

payment.findById = payment.get;

/**
 * Search payments
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/payments/_payments_search/get/}
 * @function search
 * @memberof payment
 */
payment.search = requestManager.describe({
  path: '/v1/payments/search',
  method: 'GET'
});

/**
 * Search payment: Use v0 -> /collections
 */
payment.oldSearch = collectionsModule.search;

/**
 * Cancel payment
 * @param id
 * @param config
 * @param callback
 * @returns {*}
 */
payment.cancel = function (id, config, callback) {
  var data = {
    id: id,
    status: 'cancelled'
  };
  callback = preConditions.getCallback(callback);

  return payment.update(data, config, callback);
};

/**
 * Capture payment
 * @param id
 * @param config
 * @param callback
 * @returns {*}
 */
payment.capture = function (id, config, callback) {
  var captureData = {
    id: id
  };

  return payment.capturePartial(captureData, config, callback);
};

/**
 * Capture partial payment
 * @param captureData
 * @param config
 * @param callback
 * @returns {Thenable.<U>|*|{anyOf}|*}
 */
payment.capturePartial = function (captureData, config, callback) {
  captureData.capture = true;

  callback = preConditions.getCallback(callback);

  return payment.update(captureData, config, callback);
};

/**
 * Refund payment
 * @param id
 * @param config
 * @param callback
 * @returns {*}
 */
payment.refund = function (id, config, callback) {
  var refund = {
    payment_id: id
  };

  return payment.refundPartial(refund, config, callback);
};

/**
 * Refund partial payment
 * @param refund
 * @param config
 * @param callback
 * @returns {Thenable.<U>|*|{anyOf}|*}
 */
payment.refundPartial = function (refund, config, callback) {
  callback = preConditions.getCallback(callback);

  return new Promise(function (resolve, reject) {
    return refundModule.create(refund, config).then(function (data) {
      return payment.get(data.response.payment_id, config);
    }).then(function (response) {
      resolve(response);
      return callback.apply(null, [null, response]);
    }).catch(function (err) {
      reject(err);
      return callback.apply(null, [err, null]);
    });
  });
};
