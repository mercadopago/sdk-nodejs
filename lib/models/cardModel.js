/* istanbul ignore next */
module.exports = {
  additionalProperties: true, // Fails if an extra param is added to the model
  properties: {
    id: {
      type: 'string'
    },
    token: {
      type: 'string'
    },
    customer_id: {
      type: 'string'
    },
    expiration_month: {
      type: 'integer'
    },
    expiration_year: {
      type: 'integer'
    },
    first_six_digits: {
      type: 'string'
    },
    last_four_digits: {
      type: 'string'
    },
    payment_method: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        payment_type_id: {
          type: 'string'
        },
        thumbnail: {
          type: 'string'
        },
        secure_thumbnail: {
          type: 'string'
        }
      }
    },
    security_code: {
      type: 'object',
      properties: {
        length: {
          type: 'integer'
        },
        card_location: {
          type: 'string'
        }
      }
    },
    issuer: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    },
    cardholder: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        identification: {
          type: 'object',
          properties: {
            number: {
              type: 'string'
            },
            sub_type: {
              type: 'string'
            },
            type: {
              type: 'string'
            }
          }
        }
      }
    },
    date_created: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    date_last_updated: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    payment_method_id: {
      type: 'string'
    }
  }
};
