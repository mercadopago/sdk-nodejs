var MP = require ("mercadopago"),
    config = require ("../config");

exports.run = function (req, res) {
    var mp = new MP (config.client_id, config.client_secret);

    var filters = {
            "range": "date_created",
            "begin_date": mp.utils.date.now().subtract(60).toString(),
            "end_date": mp.utils.date.now().toString(),
            "payment_type": "credit_card",
            "operation_type": "regular_payment"
        };

    mp.searchPayment (filters, function (err, data){
        if (err) {
            res.send (err);
        } else {
            res.render ("payment-search/search-result", {"result": data});
        }
    });
};
