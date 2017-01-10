var chai = require('chai'),
    moment = require('moment'),
    mercadopagoError = require('../lib/utils/mercadopagoError'),
    assert = chai.assert,
    expect = chai.expect;

describe('mercadopagoError Class', function(){
    describe('Constructor', function(){
        it('with no arguments', function(){
            var mpError = new mercadopagoError();

            assert.instanceOf(mpError, mercadopagoError, 'mpError is an instance of mercadopagoError');
            assert.equal(mpError.name, 'MercadoPagoError');
            assert.equal(mpError.message, 'Unknown Error');
            assert.equal(mpError.status, 500);
            assert.isUndefined(mpError.idempotency);
        });

        it('with arguments', function(){
            var mpError = new mercadopagoError('Time-Out', 408, 'idempotency');

            assert.instanceOf(mpError, mercadopagoError, 'mpError is an instance of mercadopagoError');
            assert.equal(mpError.name, 'MercadoPagoError');
            assert.equal(mpError.message, 'Time-Out');
            assert.equal(mpError.status, 408);
            assert.equal(mpError.idempotency, 'idempotency');
        });
    });
});