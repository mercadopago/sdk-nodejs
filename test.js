var mercadopago = require('./index');

mercadopago.configure({
  access_token: 'TEST-545545474996086-010315-04b0f100ed5aeb57304e2926cebde76a__LB_LC__-239656545'
});

mercadopago.payment.get(1234, {}, function(err, payment) {});
mercadopago.payment.get(1111, {}, function(err, payment) {});
