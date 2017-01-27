var mercadopago = require('../../index');
var config = require('../config');

// Set the access_token credentials for testing
mercadopago.configurations.setAccessToken(config.access_token);

exports.run = function (req, res) {
  mercadopago.payment.refund(parseInt(req.query.id, 10)).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
