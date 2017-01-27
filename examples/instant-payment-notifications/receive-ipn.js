var mercadopago = require('../../index');

exports.run = function (req, res) {
  mercadopago.ipn.manage(req).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
