var configurations = require('./configurations'),
    backwardSupport = require('./mercadopago-support')();

function configure(options){
    configurations.configure(options);
};

//Backward compatibility method initialization
var sdk = module.exports = function(options){
    console.warn('This way of initializing the SDK is deprecated. Please change following the documentation');
    configurations.configure(options);
};

//When support is gone this is going to be the return literal from this class
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

//Adding modules to prototype and __proto__ - This is going to be delete
Object.keys(resources).forEach(function(key){
    sdk.prototype[key] = sdk.__proto__[key] = resources[key];
});

//Adding modules to prototype and __proto__ from support module - This is going to be delete
Object.keys(backwardSupport).forEach(function(key){
    sdk.prototype[key] = sdk.__proto__[key] = backwardSupport[key];
});