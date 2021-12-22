var configurations = require('./configurations');
var backwardSupport = require('./mercadopago-support')();
var utilsModule = require('./utils');
var paymentModule = require('./resources/payment');
var paymentMethodsModule = require('./resources/paymentMethods');
var preferencesModule = require('./resources/preferences');
var preapprovalModule = require('./resources/preapproval');
var merchantOrdersModule = require('./resources/merchantOrders');
var moneyRequestsModule = require('./resources/moneyRequests');
var customersModule = require('./resources/customers');
var ipnModule = require('./resources/ipn');
var connectModule = require('./resources/connect');
var cardModule = require('./resources/card');
var cardTokenModule = require('./resources/cardToken');
var refundModule = require('./resources/refund');
var discountCampaignModule = require('./resources/discountCampaign');
var sdk;
var resources;

/**
 * Configuration options
 * @static
 * @param options
 * @param options.access_token Access Token
 * @param options.client_id Cliend ID
 * @param options.client_secret Client Secret
 * @param options.platform_id Platform Id
 * @param options.corporation_id Corporation Id
 * @param options.integrator_id Integrator Id
 * @param options.sandbox Sandbox
 */
function configure(options) {
  configurations.configure(options);
}

// Backward compatibility method initialization
sdk = module.exports = function () {
  var options = {
    // If it is the old version of the SDK, this support callbacks with Q library. This error isnt shown
    show_promise_error: false
  };

  console.warn('This way of initializing the SDK is deprecated. Please change following the documentation');

  if (arguments.length === 1) {
    options.access_token = arguments[0];
  } else if (arguments.length === 2) {
    options.client_id = arguments[0];
    options.client_secret = arguments[1];
  } else {
    throw new Error('Invalid arguments. Use CLIENT_ID and CLIENT SECRET, or ACCESS_TOKEN');
  }

  // Configure the SDK
  try {
    this.configure(options);
  } catch (error) {
    // Prevent double initialization error on client_id and client_secret
  }
};

// When support is gone this is going to be the return literal from this class
resources = {
  configure: configure,
  utils: utilsModule,
  configurations: configurations,
  payment: paymentModule,
  payment_methods: paymentMethodsModule,
  preferences: preferencesModule,
  preapproval: preapprovalModule,
  merchant_orders: merchantOrdersModule,
  customers: customersModule,
  ipn: ipnModule,
  connect: connectModule,
  money_requests: moneyRequestsModule,
  card: cardModule,
  card_token: cardTokenModule,
  refund: refundModule,
  discount_campaign: discountCampaignModule
};

// Adding modules to prototype and a static method - This is going to be delete
Object.keys(resources).forEach(function (key) {
  sdk[key] = resources[key];

  /* istanbul ignore next */
  sdk.prototype[key] = resources[key];
});

// Adding modules to prototype and a static method from support module - This is going to be delete
Object.keys(backwardSupport).forEach(function (key) {
  sdk[key] = backwardSupport[key];

  /* istanbul ignore next */
  sdk.prototype[key] = backwardSupport[key];
});
