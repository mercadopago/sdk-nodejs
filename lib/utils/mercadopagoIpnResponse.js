var mercadopagoResponse = require('./mercadopagoResponse');

// This is used on the IPN Module Only
var mercadopagoIpnResponse = function mercadopagoIpnResponse(id, topic, status, body) {
  this.body = body;
  this.status = status;
  this.id = id;
  this.topic = topic;
};

mercadopagoIpnResponse.prototype = Object.create(mercadopagoResponse.prototype);
mercadopagoIpnResponse.prototype.constructor = mercadopagoIpnResponse;

module.exports = mercadopagoIpnResponse;
