var pack = require('../package');
var configurations = require('./configurations');
var requestManager = require('./request-manager');
var paymentModule = require('./resources/payment');
var collectionsModule = require('./resources/collections');
var preapprovalModule = require('./resources/preapproval');
var preferencesModule = require('./resources/preferences');
var preConditions = require('./precondition');
var ipnModule = require('./resources/ipn');

module.exports = function () {
  /**
   * Show Warning for method deprecation
   */
  function showWarning() {
    var method = showWarning.caller.name;
    if (!configurations.areTestsRunnning()) {
      console.warn('This method (' + method + ') is deprecated and its going to be remove on next versions');
    }
  }

  /**
   * Enabled or disabled sandbox
   * @param enabled
   */
  function sandboxMode(enabled) {
    showWarning();
    configurations.sandbox = (enabled !== undefined) ? (enabled === true) : configurations.sandbox;
  }

  /**
   * Get access_token using the client_id and client_secret configure
   * @param callback
   * @returns {string}
   */
  function getAccessToken() {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return requestManager.generateAccessToken(callback);
  }

  /**
   * Execute a GET operation (Used like a rest client)
   * @param uri
   * @returns {Thenable<U>|*|{anyOf}}
   */
  function getRest(uri) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);
    var options;

    showWarning();

    options = {
      path: uri,
      method: 'GET',
      config: {
        qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
      }
    };

    return requestManager.generateAccessToken(function (err) {
      // Return callback if an error ocurr getting the access_token
      if (err) return callback.apply(null, [err, null]);
      return false;
    }).then(function (accessToken) {
      options.access_token = accessToken;
      return requestManager.exec(options, callback);
    });
  }

  /**
   * Execute a POST operation (Used like a rest client)
   * @param uri
   * @returns {Thenable<U>|*|{anyOf}}
   */
  function postRest(uri) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);
    var options;

    showWarning();

    options = {
      path: uri,
      method: 'POST',
      payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
      config: {
        qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
      }
    };

    return requestManager.generateAccessToken(function (err) {
      // Return callback if an error ocurr getting the access_token
      if (err) return callback.apply(null, [err, null]);
      return false;
    }).then(function (accessToken) {
      options.access_token = accessToken;
      return requestManager.exec(options, callback);
    });
  }

  /**
   * Execute a PUT operation (Used like a rest client)
   * @param uri
   * @returns {Thenable<U>|*|{anyOf}}
   */
  function putRest(uri) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);
    var options;

    showWarning();

    options = {
      path: uri,
      method: 'PUT',
      payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
      config: {
        qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
      }
    };

    return requestManager.generateAccessToken(function (err) {
      // Return callback if an error ocurr getting the access_token
      if (err) return callback.apply(null, [err, null]);
      return false;
    }).then(function (accessToken) {
      options.access_token = accessToken;
      return requestManager.exec(options, callback);
    });
  }

  /**
   * Execute a DELETE operation (Used like a rest client)
   * @param uri
   * @returns {Thenable<U>|*|{anyOf}}
   * @private
   */
  function deleteRest(uri) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);
    var options;

    showWarning();

    options = {
      path: uri,
      method: 'DELETE',
      config: {
        qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
      }
    };

    return requestManager.generateAccessToken(function (err) {
      // Return callback if an error ocurr getting the access_token
      if (err) return callback.apply(null, [err, null]);
      return false;
    }).then(function (accessToken) {
      options.access_token = accessToken;
      return requestManager.exec(options, callback);
    });
  }

  /**
   * Create a preference using preferenceModule
   * @param preferences
   * @param callback
   * @returns {preferences}
   */
  function createPreference(preferences) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return preferencesModule.create(preferences, callback);
  }

  /**
   * Update a preference using the preferenceModule (Make sure that the id is on the payload)
   * @param id
   * @param preference
   * @param callback
   * @returns {*}
   */
  function updatePreference(id, preference) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    // Add the id to the preferece object
    preference.id = id;

    return preferencesModule.update(preference, callback);
  }

  /**
   * Get a preference using preferenceModule
   * @param id
   * @param callback
   * @returns {*}
   */
  function getPreference(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return preferencesModule.get(id, callback);
  }

  /**
   * Create a preapproval payment using the preapprovalModule
   * @param preapproval
   * @param callback
   * @returns {preapproval}
   */
  function createPreapprovalPayment(preapproval) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return preapprovalModule.create(preapproval, callback);
  }

  /**
   * Update a preapproval payment using the preapprovalModule (Make sure that the id is on the payload)
   * @param id
   * @param preapproval
   * @param callback
   * @returns {*}
   */
  function updatePreapprovalPayment(id, preapproval) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    // Add the id to the preapproval object
    preapproval.id = id;

    return preapprovalModule.update(preapproval, callback);
  }

  /**
   * Get a preapproval payment using the preapprovalModule
   * @param id
   * @param callback
   * @returns {*}
   */
  function getPreapprovalPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return preapprovalModule.get(id, callback);
  }

  /**
   * Search for a payment using specific filters (offset and limit). Use the paymentModule
   * @param filters
   * @param offset
   * @param limit
   * @param callback
   */
  function searchPayment(filters, offset, limit) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    if (!isNaN(offset)) filters.offset = offset;
    if (!isNaN(limit)) filters.limit = limit;

    return paymentModule.oldSearch({
      qs: filters
    }, callback);
  }

  /**
   * Get a payment using the IPN Module (Before manage method exists on IPN Module)
   * @param id
   * @param callback
   * @returns {*}
   */
  function getPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return ipnModule.getPayment(id, callback);
  }

  /**
   * Get a authorized payment using the IPN Module (Before manage method exists on IPN Module)
   * @param id
   * @param callback
   * @returns {*}
   */
  function getAuthorizedPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return ipnModule.getAuthorizedPayment(id, callback);
  }

  /**
   * Refund a payment (v0 implementation)
   * @param id
   * @param callback
   * @returns {*}
   */
  function refundPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return collectionsModule.put({
      id: id,
      status: 'refunded'
    }, callback);
  }

  /**
   * Cancel a payment (v0 implementation)
   * @param id
   * @param callback
   * @returns {*}
   */
  function cancelPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return collectionsModule.put({
      id: id,
      status: 'cancelled'
    }, callback);
  }

  /**
   * Canacel a preapproval payment using the preapprovalModule
   * @param id
   * @param callback
   * @returns {*}
   */
  function cancelPreapprovalPayment(id) {
    var callback = preConditions.getCallback(arguments[arguments.length - 1]);

    showWarning();

    return preapprovalModule.update({
      id: id,
      status: 'cancelled'
    }, callback);
  }

  return {
    sandboxMode: sandboxMode,
    getAccessToken: getAccessToken,
    get: getRest,
    post: postRest,
    put: putRest,
    delete: deleteRest,
    createPreference: createPreference,
    updatePreference: updatePreference,
    getPreference: getPreference,
    createPreapprovalPayment: createPreapprovalPayment,
    updatePreapprovalPayment: updatePreapprovalPayment,
    getPreapprovalPayment: getPreapprovalPayment,
    searchPayment: searchPayment,
    getPayment: getPayment,
    getPaymentInfo: getPayment,
    getAuthorizedPayment: getAuthorizedPayment,
    refundPayment: refundPayment,
    cancelPayment: cancelPayment,
    cancelPreapprovalPayment: cancelPreapprovalPayment,
    version: pack.version
  };
};
