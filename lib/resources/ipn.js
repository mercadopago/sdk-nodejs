var requestManager = require('../request-manager'),
  preapprovalModule = require('./preapproval'),
  MercadopagoIpnResponse = require('../utils/mercadopagoIpnResponse');

var ipn = module.exports = {
  available_topics: ['preapproval', 'authorized_payment', 'payment']
};

ipn.getPayment = requestManager.describe({
  path: '/collections/notifications/:id',
  path_sandbox_prefix: true,
  method: 'GET'
});

ipn.getAuthorizedPayment = requestManager.describe({
  path: '/authorized_payments/:id',
  method: 'GET'
});

ipn.manage = function (request, callback) {
  var id = request.query.id;
  var topic = request.query.topic;

  if (this.available_topics.indexOf(topic) !== -1) {
    this[topic](id, function (err, mpResponse) {
      if (err) return callback.apply(null, [err, null]);
      return callback.apply(null, [null, new MercadopagoIpnResponse(id, topic, mpResponse.status, mpResponse.body)]);
    });
  } else {
    return callback.apply(null, [new Error('Invalid Topic (' + topic + '). The topics available are: ' + this.available_topics.join(', ')), null]);
  }
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
