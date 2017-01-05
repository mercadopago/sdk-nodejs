var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Request Manager', function(){
    var requestManager = require('../lib/request-manager');

    describe('Dynamic method Creation', function(){
        it('Callback Required', function(){
            var method = requestManager.create({
                path: '/v1/payments',
                method: 'POST'
            });

            assert.throws(method, 'Callback is required');
        });

        it('Invalid Params', function(){
            var method = requestManager.create({
                path: '/v1/payments/:id',
                method: 'POST'
            });

            assert.throws(method.bind(method, function(){}), 'Expecting parameters: id');
        });

        it('Error on token', function(){
            var tokenErrorMessage = 'Error getting the token';

            var method = requestManager.create({
                path: '/v1/payments',
                method: 'POST'
            });

            sinon.stub(requestManager, 'generateAccessToken', function(callback){
                return callback.apply(null, [new Error(tokenErrorMessage), null]);
            });

            method(function(err, response){
                assert.isNotNull(err, null);
                assert.equal(err.message, tokenErrorMessage);
            });

            requestManager.generateAccessToken.restore();
        });

        describe('Valid rest executions', function(){
            var mercadoPagoResponse = {
                    firstname: 'Ariel'
                },
                execStub;

            beforeEach(function(){
                sinon.stub(requestManager, 'generateAccessToken', function(callback){
                    return callback.apply(null, [null, 'ACCESS_TOKEN']);
                });

                execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                    return callback.apply(null, [null, mercadoPagoResponse]);
                });
            });

            afterEach(function(){
                requestManager.generateAccessToken.restore();
                requestManager.exec.restore();
            });

            it('Without params', function(){
                var callback = sinon.spy();

                var method = requestManager.create({
                    path: '/v1/payments',
                    method: 'GET'
                });

                method(callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'GET');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
            });

            it('With params', function(){
                var callback = sinon.spy();

                var method = requestManager.create({
                    path: '/v1/payments/:id',
                    method: 'POST'
                });

                method(1, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments/1');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
            });

            it('With payload', function(){
                var callback = sinon.spy(),
                    testPayload = {
                        description: 'MercadoPago Sale'
                    };

                var method = requestManager.create({
                    path: '/v1/payments',
                    method: 'POST'
                });

                method(testPayload, callback);
                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(testPayload));
            });
        });
    });
});