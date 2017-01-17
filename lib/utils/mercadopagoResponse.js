var mercadopagoResponse = function mercadopagoResponse(body, status, idempotencyId) {
  this.body = body;
  this.status = status;
  this.idempotency = idempotencyId;
};

module.exports = mercadopagoResponse;
