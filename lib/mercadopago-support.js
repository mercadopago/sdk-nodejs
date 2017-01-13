var package = require('../package'),
    configurations = require('./configurations'),
    requestManager = require('./request-manager'),
    paymentModule = require('./resources/payment'),
    preapprovalModule = require('./resources/preapproval'),
    preferencesModule = require('./resources/prefereces'),
    ipnModule = require('./resources/ipn');

module.exports = function(){

    var collectionMethod = requestManager.describe({
        path: '/v1/collections/:id',
        method: 'PUT'
    });

    function showWarning(){
        var method = arguments.callee.caller.name;
        console.warn('This method (' + method + ') is deprecated and its going to be remove on next versions');
    };

    function sandboxMode(enabled){
        showWarning();
        configurations.sandbox = ( enabled !== undefined ) ? (enabled === true) : configurations.sandbox;
    };

    function getAccessToken(callback){
        showWarning();
        return requestManager.generateAccessToken(callback);
    };

    function get(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'GET',
            config: {
                qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
            }
        };

        return requestManager.exec(options, callback);
    };

    function post(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'POST',
            payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
            config: {
                qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
            }
        };

        return requestManager.exec(options, callback);
    };

    function put(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'PUT',
            payload: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {},
            config: {
                qs: (arguments[2] !== undefined && typeof arguments[2] !== 'function') ? arguments[2] : {}
            }
        };

        return requestManager.exec(options, callback);
    };

    function _delete(uri){
        showWarning();

        var callback = ( arguments[arguments.length - 1] !== undefined && typeof arguments[arguments.length - 1] == 'function' ) ? arguments[arguments.length - 1] : function(){};

        var options = {
            path: uri,
            method: 'DELETE',
            config: {
                qs: (arguments[1] !== undefined && typeof arguments[1] !== 'function') ? arguments[1] : {}
            }
        };

        return requestManager.exec(options, callback);
    };

    function createPreference(preferences, callback){
        showWarning();
        return preferencesModule.create(preferences, callback);
    };

    function updatePreference(id, preference, callback){
        showWarning();

        //Add the id to the preferece object
        preference['id'] = id;

        return preferencesModule.update(preference, callback);
    };

    function getPreference(id, callback){
        showWarning();
        return preferencesModule.get(id, callback);
    };

    function createPreapprovalPayment(preapproval, callback){
        showWarning();
        return preapprovalModule.create(preapproval, callback);
    };

    function updatePreapprovalPayment(id, preapproval, callback){
        showWarning();

        //Add the id to the preapproval object
        preapproval['id'] = id;

        return preapprovalModule.update(preapproval, callback);
    };

    function getPreapprovalPayment(id, callback){
        showWarning();
        return preapprovalModule.get(id, callback);
    };

    function searchPayment(filters, offset, limit){
        showWarning();

        if( !isNaN(offset) ) filters.offset = offset;
        if( !isNaN(limit) ) filters.limit = limit;

        paymentModule.search({
            qs: filters
        });
    };

    function getPayment(id, callback){
        showWarning();

        return ipnModule.getPayment(id, callback);
    };

    function getAuthorizedPayment(id, callback){
        showWarning();

        return ipnModule.getAuthorizedPayment(id, callback);
    };

    function refundPayment(id, callback){
        showWarning();

        return collectionMethod({
            id: id,
            status: "refunded"
        }, callback);
    };

    function cancelPayment(id, callback){
        showWarning();

        return collectionMethod({
            id: id,
            status: "cancelled"
        }, callback);
    };

    function cancelPreapprovalPayment(id, callback){
        showWarning();

        return preapprovalModule.update({
            id: id,
            status: "cancelled"
        }, callback);
    };

    return {
        sandboxMode: sandboxMode,
        getAccessToken: getAccessToken,
        get: get,
        post: post,
        put: put,
        delete: _delete,
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
        version: package.version
    };
};