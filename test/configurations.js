var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

describe('Configurations Module', function(){
    var configuration,
        clientId = 'CLIENT_ID',
        clientSecret = 'CLIENT_SECRET',
        accessToken = 'ACCESS_TOKEN',
        refreshToken = 'REFRESH_TOKEN';

    //Get an instance of configuration on require
    beforeEach(function(){
        configuration = require('../lib/configurations.js');
    });

    //Delete the require cache after each test (Prevent Singleton)
    afterEach(function(){
        delete require.cache[require.resolve('../lib/configurations.js')];
    });

    describe('Configure Errors', function(){
        it('Expect error on empty constructor', function(){
            assert.throws(configuration.configure, 'You must provide an Object with the configurations');
        });

        it('Expect error on empty configurations', function(){
            assert.throws(configuration.configure.bind(configuration, {}), 'You must provide a method of authentication (client_id & client_secret or access_token)');
        });

        it('Expect error on client_id or client_secret only', function(){
            assert.throws(configuration.configure.bind(configuration, {
                client_id: clientId
            }), 'You must provide client_id and client_secret');

            assert.throws(configuration.configure.bind(configuration, {
                client_secret: clientSecret
            }), 'You must provide client_id and client_secret');
        });
    });

    describe('Configure Success', function(){
        it('Check client_id and client_secret variables are set', function(){
            configuration.configure({
                client_id: clientId,
                client_secret: clientSecret
            });

            assert.equal(configuration.getClientId(), clientId);
            assert.equal(configuration.getClientSecret(), clientSecret);
            assert.equal(configuration.getAccessToken(), undefined);
            assert.equal(configuration.sandbox, false);
            assert.isString(configuration.getUserAgent());
        });

        it('Check access_token is set', function(){
            configuration.configure({
                access_token: accessToken
            });

            assert.equal(configuration.getClientId(), undefined);
            assert.equal(configuration.getClientSecret(), undefined);
            assert.equal(configuration.getAccessToken(), accessToken);
            assert.equal(configuration.sandbox, false);
        });

        it('Check sandbox false value', function(){
            configuration.configure({
                client_id: clientId,
                client_secret: clientSecret,
                sandbox: false
            });

            assert.equal(configuration.sandbox, false);
        });

        it('Check sandbox true value', function(){
            configuration.configure({
                client_id: clientId,
                client_secret: clientSecret,
                sandbox: true
            });

            assert.equal(configuration.sandbox, true);
        });

        it('Expect error on client_id and client_secret already set', function(){
            configuration.configure({
                client_id: clientId,
                client_secret: clientSecret,
                sandbox: false
            });

            assert.throws(configuration.configure.bind(configuration, {
                client_id: clientId,
                client_secret: clientSecret,
            }), 'Cant change client_id or client_secret because is already set');
        });
    });

    it('Check getBaseUrl', function(){
        //TODO: Change it to sinon spy or leave the URL?
        assert.equal(configuration.getBaseUrl(), 'https://api.mercadopago.com');
    });

    it('Check setAccessToken', function(){
        configuration.configure({
            access_token: accessToken
        });

        configuration.setAccessToken(accessToken);

        assert.equal(configuration.getAccessToken(), accessToken);
    });

    it('Check setRefreshToken', function(){
        configuration.setRefreshToken(refreshToken);

        assert.equal(configuration.getRefreshToken(), refreshToken);
    });
});