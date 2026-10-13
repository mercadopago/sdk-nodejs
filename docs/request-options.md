# Request options, retries, and idempotency

Set shared defaults on `MercadoPago` and override them only when an operation has different requirements:

```ts
const client = new MercadoPago({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: { timeout: 10_000, maxRetries: 3, jitter: true },
});

await order.create({
  body,
  requestOptions: { idempotencyKey: 'order-2026-0001' },
});
```

The default timeout is 60 seconds and the default retry limit is three. The SDK retries HTTP `429`, `500`, `502`, `503`, and `504` with bounded exponential backoff from one to 30 seconds, optional jitter, and `Retry-After` support. Use `onRetry` for sanitized metrics or logs, not to issue another request.

Non-GET calls receive a generated idempotency key when none is provided. For workflows that can survive process restarts, supply and persist your own key: create it with the business operation, reuse it only for the same payload, and create a new one for a new operation.

After a timeout or connection failure, a write may have reached Mercado Pago even though no response arrived. Query by resource ID or external reference before repeating it with the same key. Coordinate SDK retries with queue/framework retries and keep the combined duration below your end-to-end deadline.
