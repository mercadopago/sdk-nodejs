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

    function sandboxMode(enabled){
        configurations.sandbox = ( enabled !== undefined ) ? (enabled === true) : configurations.sandbox;
    };

    function get(uri){
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

    function _delete(uri){
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

    function post(uri){
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

    function updatePreference(id, preference, callback){
        //Add the id to the preferece object
        preference['id'] = id;

        return preferencesModule.update(preference, callback);
    };

    function updatePreapprovalPayment(id, preapproval, callback){
        //Add the id to the preapproval object
        preapproval['id'] = id;

        return preapprovalModule.update(preapproval, callback);
    };

    function searchPayment(filters, offset, limit){
        if( !isNaN(offset) ) filters.offset = offset;
        if( !isNaN(limit) ) filters.limit = limit;

        paymentModule.search({
            qs: filters
        });
    };

    function getPayment(id, callback){
        return ipnModule.getPayment(id, callback);
    };

    function getAuthorizedPayment(id, callback){
        return ipnModule.getAuthorizedPayment(id, callback);
    };

    function refundPayment(id, callback){
        return collectionMethod({
            id: id,
            status: "refunded"
        }, callback);
    };

    function cancelPayment(id, callback){
        return collectionMethod({
            id: id,
            status: "cancelled"
        }, callback);
    };

    function cancelPreapprovalPayment(id, callback){
        return preapprovalModule.update({
            id: id,
            status: "cancelled"
        }, callback);
    };

    return {
        sandboxMode: sandboxMode,
        getAccessToken: requestManager.generateAccessToken,
        get: get,
        post: post,
        put: put,
        delete: _delete,
        createPreference: preferencesModule.create,
        updatePreference: updatePreference,
        getPreference: preferencesModule.get,
        createPreapprovalPayment: preapprovalModule.create,
        updatePreapprovalPayment: updatePreapprovalPayment,
        getPreapprovalPayment: preapprovalModule.get,
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