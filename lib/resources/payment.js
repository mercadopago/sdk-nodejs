var Promise = require('bluebird');
var requestManager = require('../request-manager');
var paymentModel = require('../models/paymentModel');
var collectionsModule = require('./collections');
var preConditions = require('../precondition');
var refundModule = require('./refund');

var payment = module.exports = {
  schema: paymentModel,
  idempotency: true,
  partnersHeaders: true
};

payment.create = requestManager.describe({
  path: '/v1/payments',
  method: 'POST'
});

payment.save = payment.create;

payment.update = requestManager.describe({
  path: '/v1/payments/:id',
  method: 'PUT'
});

payment.get = requestManager.describe({
  path: '/v1/payments/:id',
  method: 'GET'
});

payment.findById = payment.get;

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
