var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Mercadopago SDK', function(){
    var mp,
        clientId = 'CLIENT_ID',
        clientSecret = 'CLIENT_SECRET',
        accessToken = 'ACCESS_TOKEN';

    before(function(){
        //Initialize Mercadopago SDK
        mp = require('../index.js');
    });

    describe('Instance the SDK', function(){
        var sdk;

        it('Check new', function(){
            var stub = sinon.stub(console, 'warn', function(){ /* Do Nothing */ });

            sdk = new mp({
                access_token: accessToken
            });

            assert.isTrue(sdk instanceof mp);

            stub.restore();
        });
    });

    describe('Check Modules', function(){
        it('Configurations module', function(){
            assert.isObject(mp.configurations, 'Configurations module doesnt exists');
        });
      
        it('Utils module', function(){
            assert.isObject(mp.utils, 'Utils exists');
        });

        it('Payment module', function(){
            assert.isObject(mp.payment, 'Payment module doesnt exists');
        });

        it('Merchant Orders module', function(){
            assert.isObject(mp.merchant_orders, 'Merchant Orders module exists');
        });

        it('Customers module', function(){
            assert.isObject(mp.customers, 'Customers module doesnt exists');
        });

        it('Preferences module', function(){
            assert.isObject(mp.preferences, 'Preferences module doesnt exists');
        });

        describe('Compatibility Layer', function(){
            it('SandboxMode', function(){
                assert.isFunction(mp.sandboxMode);
            });

            it('getAccessToken', function(){
                assert.isFunction(mp.getAccessToken);
            });

            it('get', function(){
                assert.isFunction(mp.get);
            });

            it('post', function(){
                assert.isFunction(mp.post);
            });

            it('put', function(){
                assert.isFunction(mp.put);
            });

            it('delete', function(){
                assert.isFunction(mp.delete);
            });

            it('createPreference', function(){
                assert.isFunction(mp.createPreference);
            });

            it('updatePreference', function(){
                assert.isFunction(mp.updatePreference);
            });

            it('getPreference', function(){
                assert.isFunction(mp.getPreference);
            });

            it('createPreapprovalPayment', function(){
                assert.isFunction(mp.createPreapprovalPayment);
            });

            it('updatePreapprovalPayment', function(){
                assert.isFunction(mp.updatePreapprovalPayment);
            });

            it('updatePreapprovalPayment', function(){
                assert.isFunction(mp.updatePreapprovalPayment);
            });

            it('searchPayment', function(){
                assert.isFunction(mp.searchPayment);
            });

            it('getPayment', function(){
                assert.isFunction(mp.getPayment);
            });

            it('getPaymentInfo', function(){
                assert.isFunction(mp.getPaymentInfo);
            });

            it('getAuthorizedPayment', function(){
                assert.isFunction(mp.getAuthorizedPayment);
            });

            it('refundPayment', function(){
                assert.isFunction(mp.refundPayment);
            });

            it('cancelPayment', function(){
                assert.isFunction(mp.cancelPayment);
            });

            it('cancelPreapprovalPayment', function(){
                assert.isFunction(mp.cancelPreapprovalPayment);
            });

            it('version', function(){
                assert.isString(mp.version);
            });
        });
    });

    describe('Configure Method', function(){
        it('Check configuration is made', function(){
            mp.configure({
                client_id: clientId,
                client_secret: clientSecret
            });

            assert.equal(mp.configurations.getClientId(), clientId);
            assert.equal(mp.configurations.getClientSecret(), clientSecret);
        });
    });
});