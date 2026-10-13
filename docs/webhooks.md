# Validate and process webhooks

Validate a signed notification before trusting its identifiers:

```ts
try {
  WebhookSignatureValidator.validate({
    xSignature: request.headers['x-signature'],
    xRequestId: request.headers['x-request-id'],
    dataId: request.query['data.id'],
    secret: process.env.MP_WEBHOOK_SECRET!,
    toleranceSeconds: 300,
  });
} catch (error) {
  if (error instanceof InvalidWebhookSignatureError) {
    response.status(401).end();
    return;
  }
  throw error;
}
```

Pass the raw `x-signature`, `x-request-id`, and `data.id` values. Framework parsing, normalization, or array coercion must not alter them. QR Code notifications are not signed and must not use this validator.

For production processing:

1. Validate signature and timestamp tolerance.
2. Deduplicate by notification or resource identifier.
3. Enqueue the identifier and acknowledge promptly.
4. Fetch the current resource from Mercado Pago in a worker.
5. Apply state changes idempotently; delivery may repeat or arrive out of order.

Treat the payload as a change signal and the API lookup as the current source of truth. Keep server clocks synchronized. Record a sanitized validation outcome, but never the webhook secret or complete signature.
