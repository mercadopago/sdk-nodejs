var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

describe('Mercadopago SDK', function(){
    var mp,
        clientId = 'CLIENT_ID',
        clientSecret = 'CLIENT_SECRET',
        accessToken = 'ACCESS_TOKEN';

    before(function(){
        //Initialize Mercadopago SDK
        mp = require('../index.js');
    });

    describe('Modules Exists', function(){
        it('Configuration module', function(){
            assert.isObject(mp.configurations, 'Configurations module doesnt exists');
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