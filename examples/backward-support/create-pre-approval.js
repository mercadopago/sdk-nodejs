var mercadopago = require('../../index');

exports.run = function (req, res) {
  var preapprovalPayment = {
    payer_email: 'test_user_3931694@testuser.com',
    back_url: 'http://www.google.com',
    reason: 'Monthly subscription to premium package',
    external_reference: 'OP-1234',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: 60,
      currency_id: 'ARS',
      start_date: mercadopago.utils.date.now().add(1).toString(),
      end_date: mercadopago.utils.date.now().add(3).toString()
    }
  };

  mercadopago.createPreapprovalPayment(preapprovalPayment).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
