var MP = require ("mercadopago"),
    config = require ("../config");

exports.run = function (req, res) {
    var mp = new MP (config.client_id, config.client_secret);

    var filters = {
            "installments": "12",
            "reason": "product_name",
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
