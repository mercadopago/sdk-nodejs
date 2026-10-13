# Troubleshooting

## A request exceeds the expected duration

`timeout` applies to an attempt, while retries and backoff add elapsed time. Review `maxRetries`, backoff settings, and any queue or framework retry. Keep their combined worst case below the request or job deadline.

## A write raised `MPConnectionError`

No API response arrived, but the operation may have completed. Reconcile by resource ID or external reference before retrying with the same idempotency key.

## Repeated `429` responses

Respect `retryAfter`, lower parallelism, and avoid wrapping the SDK in an immediate retry loop. Use `onRetry` to measure pressure rather than to start another call.

## Webhook validation fails

Confirm that your web framework supplies scalar, unchanged values for `x-request-id` and `data.id`; check clock synchronization and the endpoint secret. Do not validate unsigned QR Code notifications.

## Escalating an issue

Include SDK and Node.js versions, operation, HTTP status, request ID, sanitized error type/message, and a minimal reproduction. Open a repository issue without credentials, card data, webhook secrets, or exploit details.
