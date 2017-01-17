var Ajv = require('ajv');

var validationModule = module.exports = {
  ajv: new Ajv({
    allErrors: true,
    coerceTypes: false, // (https://www.npmjs.com/package/ajv#coercing-data-types)
    // Remove additional properties if the schema haves additionalProperties = true
    removeAdditional: false // (https://www.npmjs.com/package/ajv#filtering-data)
  })
};

/**
 * Validate the data that is going to be send to API using a JSON Schema
 * @param schema
 * @param data
 * @returns {Array}
 */
validationModule.validate = function (schema, data) {
  var validate = this.ajv.compile(schema);
  var isValid = validate(data);
  var validationErrors = [];

  // Only warn about additionalProperties sended (Do not block code execution)
  if (!isValid) {
    validate.errors.forEach(function (error) {
      if (error.keyword === 'additionalProperties') {
        console.warn('MercadoPago SDK: "' + error.params.additionalProperty + '": is not a valid property.');
      } else {
        validationErrors.push(error);
      }
    });
  }

  return validationErrors;
};

/**
 * Generate error message using the response from AJV
 * @param errors
 * @returns {string}
 */
validationModule.generateErrorMessage = function (errors) {
  var message = 'The next fields are failing on validation:';

  errors.forEach(function (error) {
    message += ' "' + error.dataPath + '": ' + error.message + '.';
  });

  return message;
};
