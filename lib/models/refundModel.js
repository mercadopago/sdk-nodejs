/* istanbul ignore next */
module.exports = {
  additionalProperties: true, // Fails if an extra param is added to the model
  properties: {
    id: {
      type: 'string'
    },
    payment_id: {
      type: 'string'
    },
    amount: {
      type: 'number'
    },
    source: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        type: {
          type: 'string'
        }
      }
    },
    date_created: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    unique_sequence_number: {
      type: 'string'
    }
  }
};
