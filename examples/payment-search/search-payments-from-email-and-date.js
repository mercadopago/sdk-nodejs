var mercadopago = require('../../index');

exports.run = function (req, res) {
  var filters = {
    payer_email: 'test_user_3931694@testuser.com',
    begin_date: mercadopago.utils.date.now().subtract(60).toString(),
    end_date: mercadopago.utils.date.now().toString()
  };

  mercadopago.searchPayment({
    qs: filters
  }).then(function (data) {
    res.render('payment-search/search-result', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
