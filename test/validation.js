var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

describe('Validation Module', function(){
    var validationModule = require('../lib/validation'),
        testSchema = {
            "properties": {
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                }
            }
        };

    describe('Validate Schema', function(){
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
            assert.equal(message, 'The next fields are failing on validation: ".first_name": should be string.')
        });
    });
});