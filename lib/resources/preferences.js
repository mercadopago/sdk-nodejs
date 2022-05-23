var requestManager = require('../request-manager');
var preferencesModel = require('../models/preferencesModel');

/**
 * This class will allow you to charge your customers through our web form from any device in a simple, fast and secure way.
 * [Preferences]{@link https://www.mercadopago.com.br/developers/en/guides/online-payments/checkout-pro/introduction}
 * @namespace preferences
 */
var preferences = module.exports = {
  schema: preferencesModel,
  partnersHeaders: true
};

/**
 * Create a preference
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences/post/}
 * @function create
 * @memberof preferences
 */
preferences.create = requestManager.describe({
  path: '/checkout/preferences',
  method: 'POST'
});

preferences.save = preferences.create;

/**
 * Update a preference by ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences_id/put/}
 * @function update
 * @memberof preferences
 */
preferences.update = requestManager.describe({
  path: '/checkout/preferences/:id',
  method: 'PUT'
});

/**
 * Get a preference by ID
 * [Click here for more infos]{@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences_id/get/}
 * @function get
 * @param {string} id Preference ID
 * @memberof preferences
 */
preferences.get = requestManager.describe({
  path: '/checkout/preferences/:id',
  method: 'GET'
});

preferences.findById = preferences.get;
