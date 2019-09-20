/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    phone: {
      type: 'object',
      properties: {
        area_code: {
          type: 'string'
        },
        number: {
          type: 'string'
        }
      }
    },
    identification: {
      type: 'object',
      properties: {
        type: {
          type: 'string'
        },
        number: {
          type: 'string'
        }
      }
    },
    default_address: {
      type: 'string'
    },
    address: {
      type: 'object',
      properties: {
        zip_code: {
          type: 'string'
        },
        street_name: {
          type: 'string'
        },
        street_number: {
          type: 'integer'
        }
      }
    },
    date_registered: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    description: {
      type: 'string'
    },
    metadata: {
      type: 'string'
    },
    default_card: {
      type: 'string'
    },
    cards: {
      type: 'object',
      properties: {
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
              type: 'integer'
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
              type: 'integer'
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
                  type: 'integer'
                },
                subtype: {
                  type: 'string'
                },
                type: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    addresses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          phone: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          floor: {
            type: 'integer'
          },
          apartment: {
            type: 'string'
          },
          street_name: {
            type: 'string'
          },
          street_number: {
            type: 'number'
          },
          zip_code: {
            type: 'number'
          },
          city: {
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
          state: {
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
          country: {
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
          neighborhood: {
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
          municipality: {
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
          comments: {
            type: 'string'
          }
        }
      }
    }
  }
};
