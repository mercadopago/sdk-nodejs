/* istanbul ignore next */
module.exports = {
  additionalProperties: true, // Fails if an extra param is added to the model
  properties: {
    id: {
      type: 'string'
    },
    customer_id: {
      type: 'string'
    },
    card_id: {
      type: 'string'
    },
    security_code: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    date_created: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    date_last_updated: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    date_due: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    luhn_validation: {
      type: 'boolean'
    },
    live_mode: {
      type: 'boolean'
    },
    require_esc: {
      type: 'boolean'
    }
  }
};
