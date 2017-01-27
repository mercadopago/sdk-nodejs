var mercadopago = require('../../index');
var config = require('../config');

// Set the access_token credentials for testing
mercadopago.configurations.setAccessToken(config.access_token);

exports.run = function (req, res) {
  var payment = {
    description: 'Buying a PS4',
    transaction_amount: 10500,
    payment_method_id: 'rapipago',
    payer: {
      email: 'test_user_3931694@testuser.com',
      identification: {
        type: 'DNI',
        number: '34123123'
      }
    }
  };

  mercadopago.payment.create(payment).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
