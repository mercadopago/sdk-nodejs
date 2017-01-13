var configurations = require('./configurations');

function configure(options){
    configurations.configure(options);
};

var sdk = module.exports = function(options){
    console.warn('This way of initializing the SDK is deprecated. Please change following the documentation');
    configurations.configure(options);
};

var resources = {
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

sdk.prototype = sdk.__proto__ = Object.assign({}, resources, require('./mercadopago-support')());