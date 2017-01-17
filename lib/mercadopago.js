var configurations = require('./configurations');
var backwardSupport = require('./mercadopago-support')();
var utilsModule = require('./utils');
var paymentModule = require('./resources/payment');
var preferencesModule = require('./resources/prefereces');
var preapprovalModule = require('./resources/preapproval');
var merchantOrdersModule = require('./resources/merchantOrders');
var customersModule = require('./resources/customers');
var ipnModule = require('./resources/ipn');
var connectModule = require('./resources/connect');
var sdk;
var resources;

function configure(options) {
  configurations.configure(options);
}

// Backward compatibility method initialization
sdk = module.exports = function (options) {
  console.warn('This way of initializing the SDK is deprecated. Please change following the documentation');
  configurations.configure(options);
};

// When support is gone this is going to be the return literal from this class
resources = {
  configure: configure,
  utils: utilsModule,
  configurations: configurations,
  payment: paymentModule,
  preferences: preferencesModule,
  preapproval: preapprovalModule,
  merchant_orders: merchantOrdersModule,
  customers: customersModule,
  ipn: ipnModule,
  connect: connectModule
};

// Adding modules to prototype and a static method - This is going to be delete
Object.keys(resources).forEach(function (key) {
  sdk[key] = resources[key];

  /* istanbul ignore next */
  sdk.prototype[key] = function () {
    this.constructor[key]();
  };
});

// Adding modules to prototype and a static method from support module - This is going to be delete
Object.keys(backwardSupport).forEach(function (key) {
  sdk[key] = backwardSupport[key];

  /* istanbul ignore next */
  sdk.prototype[key] = function () {
    this.constructor[key]();
  };
});
