var configurations = require('./configurations');

module.exports = function(){

    function configure(options){
        configurations.configure(options);
    };

    var sdk = {
        configure: configure,
        utils: require('./utils'),
        configurations: configurations,
        payment: require('./resources/payment'),
        preferences: require('./resources/prefereces'),
        preapproval: require('./resources/preapproval'),
        merchant_orders: require('./resources/merchantOrders'),
        customers: require('./resources/customers'),
        ipn: require('./resources/ipn')
    };

    //Backward Compatiblity
    return Object.assign({}, sdk, require('./mercadopago-support')());
};