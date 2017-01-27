var MP = require ("mercadopago"),
    config = require ("../config");

exports.run = function (req, res) {
    var mp = new MP (config.client_id, config.client_secret);

    var filters = {
            "payer_email": "mail02@mail02.com%20mail01@mail01.com",
            "begin_date": "2011-01-01T00:00:00Z",
            "end_date": "2011-02-01T00:00:00Z"
        };

    mp.searchPayment (filters, function (err, data){
        if (err) {
            res.send (err);
        } else {
            res.render ("payment-search/search-result", {"result": data});
        }
    });
};

