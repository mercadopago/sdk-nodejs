var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Mercadopago SDK', function(){
    var ipnModule = require('../lib/resources/ipn'),
        preapprovalModule = require('../lib/resources/preapproval');

    before(function(){

    });

    describe('Manage', function(){
        it('Invalid Topic', function(){
            var callback = sinon.spy();

            ipnModule.manage({
                query: {
                    id: 1,
                    topic: 'invalid'
                }
            }, callback);

            assert.isTrue(callback.called);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'Invalid Topic (invalid). The topics available are: preapproval, authorized_payment, payment')
        });

        it('Payment Topic', function(){
            var callback = sinon.spy();

            var getPaymentStub = sinon.stub(ipnModule, 'getPayment', function(options, callback){
                return callback.apply(null, [null, {
                    status: 200,
                    body: {
                        test_response: true
                    }
                }]);
            });

            ipnModule.manage({
                query: {
                    id: 1,
                    topic: 'payment'
                }
            }, callback);

            var getPaymentId = getPaymentStub.args[0][0];

            assert.equal(getPaymentId, 1);

            assert.isTrue(callback.called);

            var callbackResponse = callback.args[0][1];

            assert.equal(callbackResponse.id, 1);
            assert.equal(callbackResponse.topic, 'payment');
            assert.equal(callbackResponse.status, 200);
            assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));

            ipnModule.getPayment.restore();
        });

        it('Authorized Payment Topic', function(){
            var callback = sinon.spy();

            var getAuthorizedPaymentStub = sinon.stub(ipnModule, 'getAuthorizedPayment', function(options, callback){
                return callback.apply(null, [null, {
                    status: 200,
                    body: {
                        test_response: true
                    }
                }]);
            });

            ipnModule.manage({
                query: {
                    id: 2,
                    topic: 'authorized_payment'
                }
            }, callback);

            var getAuthorizedPaymentId = getAuthorizedPaymentStub.args[0][0];

            assert.equal(getAuthorizedPaymentId, 2);

            assert.isTrue(callback.called);

            var callbackResponse = callback.args[0][1];

            assert.equal(callbackResponse.id, 2);
            assert.equal(callbackResponse.topic, 'authorized_payment');
            assert.equal(callbackResponse.status, 200);
            assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));

            ipnModule.getAuthorizedPayment.restore();
        });

        it('Preapproval Topic', function(){
            var callback = sinon.spy();

            var getPreApproval = sinon.stub(preapprovalModule, 'get', function(options, callback){
                return callback.apply(null, [null, {
                    status: 200,
                    body: {
                        test_response: true
                    }
                }]);
            });

            ipnModule.manage({
                query: {
                    id: 3,
                    topic: 'preapproval'
                }
            }, callback);

            var getPreapprovalId = getPreApproval.args[0][0];

            assert.equal(getPreapprovalId, 3);

            assert.isTrue(callback.called);

            var callbackResponse = callback.args[0][1];

            assert.equal(callbackResponse.id, 3);
            assert.equal(callbackResponse.topic, 'preapproval');
            assert.equal(callbackResponse.status, 200);
            assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));

            preapprovalModule.get.restore();
        });

        it('Error on manage', function(){
            var callback = sinon.spy();

            sinon.stub(ipnModule, 'getPayment', function(options, callback){
                return callback.apply(null, [new Error('Error on getting payment'), null]);
            });

            ipnModule.manage({
                query: {
                    id: 1,
                    topic: 'payment'
                }
            }, callback);

            assert.isTrue(callback.called);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'Error on getting payment');

            ipnModule.getPayment.restore();
        });
    });
});