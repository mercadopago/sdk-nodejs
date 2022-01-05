var requestManager = require('../request-manager');
var refundModel = require('../models/refundModel');

/**
 * This class will allow you to refund payments created through the Payments class.
 * You can refund a payment within 180 days after it was approved.
 * You must have sufficient funds in your account in order to successfully refund the payment amount. Otherwise, you will get a 400 Bad Request error.
 * [Refund Class]{@link https://www.mercadopago.com.br/developers/en/guides/manage-account/account/cancellations-and-refunds#bookmark_refunds}
 * @namespace refund
 */
var refund = module.exports = {
  schema: refundModel,
  idempotency: true
};

/**
 * Get all refunds by payment id
 * @function all
 * @param {string} payment_id Payment Id
 * @memberof refund
 */
refund.all = requestManager.describe({
  path: '/v1/payments/:payment_id/refunds',
  method: 'GET'
});

/**
 * Create a refunds by payment id
 * @function create
 * @param {string} payment_id Payment Id
 * @memberof refund
 */
refund.create = requestManager.describe({
  path: '/v1/payments/:payment_id/refunds',
  method: 'POST'
});

refund.save = refund.create;
