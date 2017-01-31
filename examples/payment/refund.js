var mercadopago = require('../../index');
var config = require('../config');
var oldAccessToken = mercadopago.configurations.getAccessToken();

exports.run = function (req, res) {
  // Set the access_token credentials for testing
  mercadopago.configurations.setAccessToken(config.access_token);

  mercadopago.payment.refund(parseInt(req.query.id, 10)).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  }).finally(function() {
    mercadopago.configurations.setAccessToken(oldAccessToken);
  });
};
