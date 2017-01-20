/* istanbul ignore next */
module.exports = {
  additionalProperties: false, // Fails if an extra param is added to the model
  properties: {
    id: {
      type: 'integer'
    },
    status: {
      type: 'string'
    },
    amount: {
      type: 'number'
    },
    metadata: {
      type: 'object',
      properties: {
        reason: {
          type: 'string'
        },
        external_reference: {
          type: 'string'
        }
      }
    }
  }
};
