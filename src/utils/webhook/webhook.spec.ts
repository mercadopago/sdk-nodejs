import * as crypto from 'crypto';
import {
	WebhookSignatureValidator,
	InvalidWebhookSignatureError,
	SignatureFailureReason,
} from '.';

const SECRET = 'your_secret_key_here';
const REQUEST_ID = '2066ca19-c6f1-498a-be75-1923005edd06';
const DATA_ID_RAW = 'ORD01JQ4S4KY8HWQ6NA5PXB65B3D3';
const DATA_ID_LOWER = 'ord01jq4s4ky8hwq6na5pxb65b3d3';
const TS = '1742505638683';
const TS_NUM = Number(TS);

function computeHash(dataId: string | undefined, requestId: string | undefined, ts: string, secret: string): string {
	const parts: string[] = [];
	if (dataId) parts.push(`id:${dataId.toLowerCase()}`);
	if (requestId) parts.push(`request-id:${requestId}`);
	parts.push(`ts:${ts}`);
	return crypto.createHmac('sha256', secret).update(parts.join(';') + ';').digest('hex');
}

function buildHeader(hash: string, ts: string = TS, version: string = 'v1'): string {
	return `ts=${ts},${version}=${hash}`;
}

const validHash = computeHash(DATA_ID_LOWER, REQUEST_ID, TS, SECRET);
const validHeader = buildHeader(validHash);
const fixedNow = () => TS_NUM;

describe('WebhookSignatureValidator', () => {
	describe('happy path', () => {
		it('case 1 — lowercase dataId passes', () => {
			expect(() => WebhookSignatureValidator.validate({
				xSignature: validHeader, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET, now: fixedNow,
			})).not.toThrow();
		});

		it('case 2 — uppercase dataId is lowercased before HMAC', () => {
			expect(() => WebhookSignatureValidator.validate({
				xSignature: validHeader, xRequestId: REQUEST_ID, dataId: DATA_ID_RAW, secret: SECRET, now: fixedNow,
			})).not.toThrow();
		});
	});

	describe('malformed / missing header', () => {
		it('case 3 — malformed header throws MalformedSignatureHeader', () => {
			try {
				WebhookSignatureValidator.validate({
					xSignature: 'this-is-garbage', xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				});
				fail('expected throw');
			} catch (err) {
				expect(err).toBeInstanceOf(InvalidWebhookSignatureError);
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.MalformedSignatureHeader);
				expect((err as InvalidWebhookSignatureError).requestId).toBe(REQUEST_ID);
			}
		});

		it('case 4 — missing header throws MissingSignatureHeader', () => {
			try {
				WebhookSignatureValidator.validate({
					xSignature: undefined, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.MissingSignatureHeader);
			}
		});

		it('case 5 — missing ts throws MissingTimestamp', () => {
			try {
				WebhookSignatureValidator.validate({
					xSignature: `v1=${validHash}`, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.MissingTimestamp);
			}
		});

		it('case 6 — missing v1 throws MissingHash', () => {
			try {
				WebhookSignatureValidator.validate({
					xSignature: `ts=${TS}`, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.MissingHash);
				expect((err as InvalidWebhookSignatureError).timestamp).toBe(TS);
			}
		});
	});

	describe('signature mismatch', () => {
		it('case 7 — wrong hash throws SignatureMismatch', () => {
			const tampered = validHash.slice(0, -2) + (validHash.endsWith('00') ? 'ff' : '00');
			try {
				WebhookSignatureValidator.validate({
					xSignature: buildHeader(tampered), xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.SignatureMismatch);
			}
		});
	});

	describe('tolerance', () => {
		it('case 8 — ts outside tolerance throws TimestampOutOfTolerance', () => {
			const farFuture = () => TS_NUM + 10 * 60 * 1000;
			try {
				WebhookSignatureValidator.validate({
					xSignature: validHeader, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
					toleranceSeconds: 60, now: farFuture,
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.TimestampOutOfTolerance);
			}
		});

		it('ts within tolerance passes', () => {
			const slightlyAfter = () => TS_NUM + 30 * 1000;
			expect(() => WebhookSignatureValidator.validate({
				xSignature: validHeader, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				toleranceSeconds: 60, now: slightlyAfter,
			})).not.toThrow();
		});
	});

	describe('manifest omission rule', () => {
		it('case 9 — dataId absent excludes id:', () => {
			const hash = computeHash(undefined, REQUEST_ID, TS, SECRET);
			expect(() => WebhookSignatureValidator.validate({
				xSignature: buildHeader(hash), xRequestId: REQUEST_ID, dataId: undefined, secret: SECRET,
			})).not.toThrow();
		});

		it('case 10 — requestId absent excludes request-id:', () => {
			const hash = computeHash(DATA_ID_LOWER, undefined, TS, SECRET);
			expect(() => WebhookSignatureValidator.validate({
				xSignature: buildHeader(hash), xRequestId: undefined, dataId: DATA_ID_LOWER, secret: SECRET,
			})).not.toThrow();
		});

		it('case 11 — both absent yields ts: only', () => {
			const hash = computeHash(undefined, undefined, TS, SECRET);
			expect(() => WebhookSignatureValidator.validate({
				xSignature: buildHeader(hash), xRequestId: '', dataId: '   ', secret: SECRET,
			})).not.toThrow();
		});
	});

	describe('topic agnostic', () => {
		it('case 12 — non-payment topic uses same algorithm', () => {
			const orderDataId = 'ord01abc123';
			const hash = computeHash(orderDataId, REQUEST_ID, TS, SECRET);
			expect(() => WebhookSignatureValidator.validate({
				xSignature: buildHeader(hash), xRequestId: REQUEST_ID, dataId: orderDataId, secret: SECRET,
			})).not.toThrow();
		});
	});

	describe('supportedVersions', () => {
		it('finds v1 when both v1 and v2 are present and only v1 is supported', () => {
			const header = `ts=${TS},v1=${validHash},v2=aaaa`;
			expect(() => WebhookSignatureValidator.validate({
				xSignature: header, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
				supportedVersions: ['v1'],
			})).not.toThrow();
		});

		it('throws MissingHash when only v2 is in header and only v1 is supported', () => {
			try {
				WebhookSignatureValidator.validate({
					xSignature: `ts=${TS},v2=somehash`, xRequestId: REQUEST_ID, dataId: DATA_ID_LOWER, secret: SECRET,
					supportedVersions: ['v1'],
				});
				fail('expected throw');
			} catch (err) {
				expect((err as InvalidWebhookSignatureError).reason).toBe(SignatureFailureReason.MissingHash);
			}
		});
	});

	describe('framework-shape input', () => {
		it('accepts array values (Express headers can be arrays)', () => {
			expect(() => WebhookSignatureValidator.validate({
				xSignature: [validHeader], xRequestId: [REQUEST_ID], dataId: DATA_ID_LOWER, secret: SECRET,
			})).not.toThrow();
		});
	});
});
