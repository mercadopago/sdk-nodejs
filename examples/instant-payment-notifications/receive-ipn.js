var MP = require ('mercadopago'),
    config = require ("../config");

exports.run = function (req, res) {
    var mp = new MP (config.client_id, config.client_secret);

    switch (req.param("topic")) {
        case "payment":
            mp.getPayment (req.param("id"), function (err, data){
                if (err) {
                    res.send (err);
                } else {
                    res.render ("jsonOutput", {"result": data});
                }
            });
            break;

        case "authorized_payment":
            mp.getAuthorizedPayment (req.param("id"), function (err, data){
                if (err) {
                    res.send (err);
                } else {
                    res.render ("jsonOutput", {"result": data});
                }
            });
            break;

        case "preapproval":
            mp.getPreapprovalPayment (req.param("id"), function (err, data){
                if (err) {
                    res.send (err);
                } else {
                    res.render ("jsonOutput", {"result": data});
                }
            });
            break;

    }

};