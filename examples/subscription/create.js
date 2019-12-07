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
  
  mercadopago.plan.create(planPayment).then(function (plan) {
    var subscriptionData = {
      plan_id: plan.body.id,
      payer: {
        id: 'customer_id'
      }
    };

    mercadopago.subscription.create(subscriptionData).then(function (data) {
      console.log('subscription created:');
      console.log(data);
    }).catch(oncatch);
  }).catch(oncatch);

  function oncatch (error) {
    res.render('500', {
      error: error
    });
  }
};
