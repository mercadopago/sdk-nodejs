var mercadopago = require('../../index');

exports.run = function (req, res) {
  var filters = {
    range: 'date_created',
    begin_date: 'NOW-1MONTH',
    end_date: 'NOW',
    status: 'approved',
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
