var MP = require ("mercadopago"),
    config = require ("../config");

exports.run = function (req, res) {
    var mp = new MP (config.client_id, config.client_secret);

    var preapprovalPayment = {
        "payer_email": "test_user_3931694@testuser.com",
        "back_url": "http://www.google.com",
        "reason": "Monthly subscription to premium package",
        "external_reference": "OP-1234",
        "auto_recurring": {
            "frequency": 1,
            "frequency_type": "months",
            "transaction_amount": 60,
            "currency_id": "ARS",
            "start_date": mp.utils.date.now().add(1).toString(),
            "end_date": mp.utils.date.now().add(3).toString()
        }
    };

    mp.createPreapprovalPayment (preapprovalPayment, function (err, data){
        if (err) {
            res.send (err);
        } else {
            res.render ("preapproval-payments/button", {"preapproval": data});
        }
    });
};