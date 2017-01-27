var mercadopago = require('../../index');

exports.run = function (req, res) {
  var filters = {
    range: 'date_created',
    begin_date: mercadopago.utils.date.now().subtract(60).toString(),
    end_date: mercadopago.utils.date.now().toString(),
    payment_type_id: 'credit_card',
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
