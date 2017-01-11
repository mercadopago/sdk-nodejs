var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Validation Module', function(){
    var validationModule = require('../lib/validation'),
        testSchema = {
            "additionalProperties": false,
            "properties": {
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "rate": {
                    "type": "integer"
                }
            }
        };

    it('Validation Successful', function(){
        var errors = validationModule.validate(testSchema, {
            first_name: 'Ariel'
        });

        assert.isArray(errors, 'Always returns an array');
        assert.equal(errors.length, 0, 'Shouldnt be any errors');
    });

    it('Validation Fail', function(){
        var errors = validationModule.validate(testSchema, {
            first_name: true
        });

        assert.isArray(errors, 'Always returns an array');
        assert.equal(errors.length, 1, 'Should be an error');
    });

    it('Error messages generation', function(){
        var errors = validationModule.validate(testSchema, {
            first_name: true
        });

        var message = validationModule.generateErrorMessage(errors);

        assert.isArray(errors, 'Always returns an array');
        assert.equal(errors.length, 1, 'Should be an error');
        assert.equal(message, 'The next fields are failing on validation: ".first_name": should be string.');
    });

    it('Extra parameters only warning', function(){
        sinon.spy(console, 'warn');

        var schemaToValidate = {
            first_name: 'Ariel',
            ratee: 'test'
        };

        var errors = validationModule.validate(testSchema, schemaToValidate);

        assert.isArray(errors, 'Always returns an array');
        assert.equal(errors.length, 0, 'Should be an error');

        //Console asserts
        assert.isTrue(console.warn.calledOnce);
        assert.isTrue(console.warn.calledWith('MercadoPago SDK: "ratee": is not a valid property.'));

        console.warn.restore();
    });
});