import * as crypto from 'crypto';

/**
 * MercadoPago webhook signature validator.
 *
 * Verifies the authenticity of incoming webhook notifications by recomputing
 * the HMAC-SHA256 signature locally and comparing it against the value carried
 * in the `x-signature` header. The implementation is stateless, performs no
 * outbound HTTP calls, and does not depend on `MercadoPagoConfig` — the
 * integrator passes the secret signature explicitly on every call.
 *
 * @module utils/webhook
 */

/**
 * Enumerates the reasons why {@link WebhookSignatureValidator} may reject a
 * MercadoPago webhook notification.
 *
 * Each value maps to a specific failure mode in the signature verification flow.
 * Integrators are encouraged to log this value alongside the
 * `x-request-id` for correlation against the MercadoPago notifications dashboard.
 */
export enum SignatureFailureReason {
	/** The `x-signature` header was missing, empty, or whitespace. */
	MissingSignatureHeader = 'MissingSignatureHeader',

	/**
	 * The `x-signature` header did not match the expected `ts=...,vN=...`
	 * format and could not be parsed.
	 */
	MalformedSignatureHeader = 'MalformedSignatureHeader',

	/** The header parsed correctly but no `ts=` component was present. */
	MissingTimestamp = 'MissingTimestamp',

	/**
	 * The header did not include a hash for any of the versions listed in
	 * `supportedVersions`. Typically indicates that MercadoPago has migrated to
	 * a new signature version (e.g. `v2`) and the SDK needs to be upgraded.
	 */
	MissingHash = 'MissingHash',

	/**
	 * The HMAC computed locally did not match the hash provided in the header.
	 * Most often caused by an incorrect secret signature or by a forged request.
	 */
	SignatureMismatch = 'SignatureMismatch',

	/**
	 * The header timestamp was outside the configured `tolerance` window
	 * against the current clock. May indicate clock drift on the integrator's
	 * server or a replay attack.
	 */
	TimestampOutOfTolerance = 'TimestampOutOfTolerance',
}

/**
 * Error thrown by {@link WebhookSignatureValidator.validate} when a webhook
 * notification cannot be confirmed as originating from MercadoPago.
 *
 * The instance carries enough context to support structured logging without
 * exposing internal details in the HTTP response.
 */
export class InvalidWebhookSignatureError extends Error {
	/** The specific failure mode that triggered the error. */
	readonly reason: SignatureFailureReason;

	/** The `x-request-id` header value, when available at the point of failure. */
	readonly requestId?: string;

	/** The `ts` value extracted from the `x-signature` header, when parsing reached that point. */
	readonly timestamp?: string;

	constructor(reason: SignatureFailureReason, requestId?: string, timestamp?: string) {
		super(`Invalid webhook signature: ${reason}`);
		this.name = 'InvalidWebhookSignatureError';
		this.reason = reason;
		this.requestId = requestId;
		this.timestamp = timestamp;
		Object.setPrototypeOf(this, InvalidWebhookSignatureError.prototype);
	}
}

/**
 * Arguments accepted by {@link WebhookSignatureValidator.validate}.
 *
 * Header and query values may be `string | string[] | null | undefined` to match
 * the loose shapes that web frameworks (Express, Fastify, etc.) commonly produce.
 * The validator normalises them internally.
 */
export interface ValidateOptions {
	/** Raw value of the `x-signature` request header. */
	xSignature: string | string[] | undefined | null;

	/** Raw value of the `x-request-id` request header. */
	xRequestId: string | string[] | undefined | null;

	/** Value of the `data.id` query string parameter. */
	dataId: string | string[] | undefined | null;

	/** Secret signature configured for the application in Tus Integraciones. */
	secret: string;

	/**
	 * Optional maximum allowed drift in seconds between the timestamp in the
	 * header and `Date.now()`. Setting a small window (e.g. 300 seconds)
	 * mitigates replay attacks. Omit to skip the check.
	 */
	toleranceSeconds?: number;

	/**
	 * Optional ordered list of signature versions the validator will accept.
	 * Defaults to `['v1']`. The validator iterates in order and uses the first
	 * version found in the header, allowing forward compatibility with future
	 * signature schemes (e.g. `v2`) without breaking older integrations.
	 */
	supportedVersions?: string[];

	/**
	 * Optional clock function used for the tolerance check. Defaults to
	 * `Date.now`. Intended for tests; production code should not override.
	 */
	now?: () => number;
}

const DEFAULT_VERSIONS: ReadonlyArray<string> = ['v1'];
const VERSION_KEY_REGEX = /^v\d+$/;

/**
 * Stateless utility that validates the signature of a MercadoPago webhook.
 *
 * On failure it throws {@link InvalidWebhookSignatureError}; on success it
 * returns nothing. The comparison is performed in constant time to mitigate
 * timing attacks.
 *
 * QR Code notifications are **not signed** by MercadoPago — do not call this
 * validator for those events; they will always fail signature verification.
 */
export class WebhookSignatureValidator {
	/**
	 * Validates the signature of a MercadoPago webhook notification.
	 *
	 * @param options - Validation inputs (see {@link ValidateOptions}).
	 * @throws {@link InvalidWebhookSignatureError} when the signature is missing,
	 *   malformed, or does not match the expected HMAC.
	 */
	static validate(options: ValidateOptions): void {
		const xSignature = normalise(options.xSignature);
		const xRequestId = normalise(options.xRequestId);
		const dataId = normalise(options.dataId);
		const secret = options.secret;
		const supportedVersions = options.supportedVersions ?? DEFAULT_VERSIONS;
		const toleranceSeconds = options.toleranceSeconds;
		const now = options.now ?? (() => Date.now());

		if (!xSignature) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingSignatureHeader, xRequestId);
		}

		const { ts, hashes } = parseSignatureHeader(xSignature);

		if (!ts && Object.keys(hashes).length === 0) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId);
		}

		if (!ts) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingTimestamp, xRequestId);
		}

		if (!/^\d+$/.test(ts)) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.MalformedSignatureHeader, xRequestId, ts);
		}

		let receivedHash: string | undefined;
		for (const version of supportedVersions) {
			if (hashes[version]) {
				receivedHash = hashes[version];
				break;
			}
		}

		if (!receivedHash) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.MissingHash, xRequestId, ts);
		}

		const manifest = buildManifest(dataId, xRequestId, ts);
		const computedHash = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

		if (!constantTimeEquals(computedHash, receivedHash)) {
			throw new InvalidWebhookSignatureError(SignatureFailureReason.SignatureMismatch, xRequestId, ts);
		}

		if (toleranceSeconds !== undefined) {
			const tsMs = Number(ts);
			const driftSeconds = Math.abs(now() - tsMs) / 1000;
			if (driftSeconds > toleranceSeconds) {
				throw new InvalidWebhookSignatureError(SignatureFailureReason.TimestampOutOfTolerance, xRequestId, ts);
			}
		}
	}
}

/**
 * Coerces a header/query value (which may be string, array, null, or undefined)
 * into a trimmed non-empty string, or `undefined` when the value is missing.
 */
function normalise(value: string | string[] | undefined | null): string | undefined {
	if (value === undefined || value === null) return undefined;
	const raw = Array.isArray(value) ? value[0] : value;
	if (raw === undefined || raw === null) return undefined;
	const trimmed = String(raw).trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Parses the `x-signature` header into its `ts` and `vN` components.
 * Unknown keys are silently ignored.
 */
function parseSignatureHeader(header: string): { ts?: string; hashes: Record<string, string> } {
	const hashes: Record<string, string> = {};
	let ts: string | undefined;

	for (const part of header.split(',')) {
		const eq = part.indexOf('=');
		if (eq === -1) continue;
		const key = part.substring(0, eq).trim().toLowerCase();
		const value = part.substring(eq + 1).trim();
		if (!key || !value) continue;
		if (key === 'ts') {
			ts = value;
		} else if (VERSION_KEY_REGEX.test(key)) {
			hashes[key] = value;
		}
	}

	return { ts, hashes };
}

/**
 * Builds the manifest string that will be fed into the HMAC.
 * Pairs whose value is missing are omitted, per the documented rule.
 */
function buildManifest(dataId: string | undefined, requestId: string | undefined, ts: string): string {
	const parts: string[] = [];
	if (dataId) parts.push(`id:${dataId.toLowerCase()}`);
	if (requestId) parts.push(`request-id:${requestId}`);
	parts.push(`ts:${ts}`);
	return parts.join(';') + ';';
}

/**
 * Constant-time hex-string comparison. Returns `false` (without divulging
 * lengths via timing) when the strings differ in length.
 */
function constantTimeEquals(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
