var Ajv = require('ajv');

var validationModule = module.exports = {
    ajv: new Ajv({
        allErrors: true,
        //TODO: Allow this? '1' is a number (https://www.npmjs.com/package/ajv#coercing-data-types)
        //coerceTypes: true
        //TODO: Should remove addition values form the model? (https://www.npmjs.com/package/ajv#filtering-data)
        //removeAdditional: true
    })
};

/**
 * Validate the data that is going to be send to API using a JSON Schema
 * @param schema
 * @param data
 * @returns {Array}
 */
validationModule.validate = function(schema, data){
    var validate = this.ajv.compile(schema),
        isValid = validate(data);

    return (!isValid) ? validate.errors : [];
};

/**
 * Generate error message using the response from AJV
 * @param errors
 * @returns {string}
 */
validationModule.generateErrorMessage = function(errors){
    var message = 'The next fields are failing on validation:';

    errors.forEach(function(error){
        message += ' "' + error.dataPath + '": ' + error.message + '.';
    });

    return message;
};