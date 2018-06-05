var requestManager = require('../request-manager');
var preapprovalModule = require('./preapproval');
var merchantOrdersModule = require('./merchantOrders');
var MercadopagoIpnResponse = require('../utils/mercadopagoIpnResponse');
var Promise = require('bluebird');
var preConditions = require('../precondition');

var ipn = module.exports = {
  available_topics: ['preapproval', 'authorized_payment', 'payment', 'merchant_order']
};

ipn.getPayment = requestManager.describe({
  path: '/v1/payments/:id',
  method: 'GET'
});

ipn.getAuthorizedPayment = requestManager.describe({
  path: '/authorized_payments/:id',
  method: 'GET'
});

/**
 * Manage the request obtain by the ipn endpoint
 * @param request
 * @param callback
 * @returns {*}
 */
ipn.manage = function (request, callback) {
  callback = preConditions.getCallback(callback);

  return new Promise(function (resolve, reject) {
    var id = request.query.id;
    var topic = request.query.topic;
    var mpResponse;
    var mpError;

    if (this.available_topics.indexOf(topic) !== -1) {
      this[topic](id, function (err, response) {
        if (err) {
          reject(err);
          return callback.apply(null, [err, null]);
        }

        mpResponse = new MercadopagoIpnResponse(id, topic, response.status, response.body);
        resolve(mpResponse);
        return callback.apply(null, [null, mpResponse]);
      });
    } else {
      mpError = new Error('Invalid Topic (' + topic + '). The topics available are: '
        + this.available_topics.join(', '));
      reject(mpError);
      return callback.apply(null, [mpError, null]);
    }
  }.bind(this));
};

ipn.payment = function (id, callback) {
  return this.getPayment(id, callback);
};

ipn.authorized_payment = function (id, callback) {
  return this.getAuthorizedPayment(id, callback);
};

ipn.preapproval = function (id, callback) {
  return preapprovalModule.get(id, callback);
};

ipn.merchant_order = function (id, callback) {
  return merchantOrdersModule.get(id, callback);
};
