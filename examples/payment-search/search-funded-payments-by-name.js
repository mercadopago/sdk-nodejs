var mercadopago = require('../../index');

exports.run = function (req, res) {
  var filters = {
    installments: '12',
    description: 'product_name',
    operation_type: 'regular_payment'
  };

  mercadopago.payment.search({
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
