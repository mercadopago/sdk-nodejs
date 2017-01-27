var mercadopago = require('../../../index');

exports.run = function (req, res) {
  var preference = {
    items: [
      {
        title: 'Test',
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 10.5
      }
    ]
  };

  mercadopago.createPreference(preference).then(function (data) {
    console.log(data.response)
    res.render('checkout-buttons/basic-preference/button', {
      preference: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};
