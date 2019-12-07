var mercadopago = require('../../index');

exports.run = function (req, res) {
  var planPayment = {
    description: 'Monthly premium package',
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: 100
    }
  };

  mercadopago.plan.create(planPayment).then(function (data) {
    res.render('plan/create', {
      plan: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
