var configurations = require('./configurations');

module.exports = function(){

    function configure(options){
        configurations.configure(options);
    };

    var sdk = {
        configure: configure,
        configurations: configurations,
        utils: require('./utils'),
        payment: require('./resources/payment'),
        merchant_orders: require('./resources/merchantOrders'),
        customers: require('./resources/customers'),
        preferences: require('./resources/prefereces')
    };

    //Backward Compatiblity
    return Object.assign({}, sdk, require('./mercadopago-support')());
};