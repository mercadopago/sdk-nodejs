var requestManager = require('../request-manager');
var subscriptionModel = require('../models/subscriptionModel');
var preConditions = require('../precondition');

var subscription = module.exports = {
  schema: subscriptionModel
};

subscription.create = requestManager.describe({
  path: '/v1/subscriptions',
  method: 'POST'
});

subscription.save = subscription.create;

subscription.update = requestManager.describe({
  path: '/v1/subscriptions/:id',
  method: 'PUT'
});

subscription.get = requestManager.describe({
  path: '/v1/subscriptions/:id',
  method: 'GET'
});

subscription.findById = subscription.get;

/**
 * Cancel a subscription
 * @param id
 * @param callback
 * @returns {*}
 */
subscription.cancel = function (id, callback) {
  var subscriptionId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: subscriptionId,
    status: 'cancelled'
  }, callback);
};

/**
 * Pause a subscription
 * @param id
 * @param callback
 * @returns {*}
 */
subscription.pause = function (id, callback) {
  var subscriptionId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: subscriptionId,
    status: 'paused'
  }, callback);
};
