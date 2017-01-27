/* eslint-env node, mocha */
var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var validationModule = require('../lib/validation');

describe('Validation Module', function () {
  var testSchema = {
    additionalProperties: false,
    properties: {
      first_name: {
        type: 'string'
      },
      last_name: {
        type: 'string'
      },
      creation_date: {
        type: 'string',
        pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
      },
      rate: {
        type: 'integer'
      }
    }
  };

  it('Validation Successful', function () {
    var errors = validationModule.validate(testSchema, {
      first_name: 'Ariel'
    });

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 0, 'Shouldnt be any errors');
  });

  it('Validation Fail', function () {
    var errors = validationModule.validate(testSchema, {
      first_name: true
    });

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 1, 'Should be an error');
  });

  it('Error messages generation', function () {
    var errors = validationModule.validate(testSchema, {
      first_name: true
    });

    var message = validationModule.generateErrorMessage(errors);

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 1, 'Should be an error');
    assert.equal(message, 'The next fields are failing on validation: ".first_name": should be string.');
  });

  it('Extra parameters only warning', function () {
    var warnStub = sinon.stub(console, 'warn', function () { /* Do Nothing */ });

    var schemaToValidate = {
      first_name: 'Ariel',
      ratee: 'test'
    };

    var errors = validationModule.validate(testSchema, schemaToValidate);

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 0, 'Should be an error');

    // Console asserts
    assert.isTrue(warnStub.calledOnce);
    assert.isTrue(warnStub.calledWith('MercadoPago SDK: "ratee": is not a valid property.'));

    warnStub.restore();
  });

  it('Valid ISO 8601 Pattern', function () {
    var errors = validationModule.validate(testSchema, {
      creation_date: '2016-01-01T18:00:00.000-03:00'
    });

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 0, 'Shouldnt be any errors');
  });

  it('Invalid ISO 8601 Pattern', function () {
    var errors = validationModule.validate(testSchema, {
      creation_date: '2016-01-01T18:00:00.000'
    });

    assert.isArray(errors, 'Always returns an array');
    assert.equal(errors.length, 1, 'Should be an error');
  });
});
