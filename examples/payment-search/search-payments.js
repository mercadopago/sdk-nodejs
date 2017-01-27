var mercadopago = require('../../index');

exports.run = function (req, res) {
  var filters = {
    site_id: 'MLA',
    external_reference: 'BILL_001'
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
