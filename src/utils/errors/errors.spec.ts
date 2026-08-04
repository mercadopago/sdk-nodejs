/**
 * Unit tests for typed exception hierarchy and RestClient retry config (TASK-019, TASK-021, TASK-022).
 */
import {
	MercadoPagoError,
	MPBadRequestError,
	MPAuthenticationError,
	MPPaymentError,
	MPForbiddenError,
	MPNotFoundError,
	MPIdempotencyError,
	MPValidationError,
	MPResourceLockedError,
	MPDependencyError,
	MPRateLimitError,
	MPServerError,
	MPConnectionError,
	buildError,
} from '.';
import { AppConfig } from '@utils/config';
import { createAutoPagingIterable } from '@utils/pagination';

// ─── Exception hierarchy ──────────────────────────────────────────────────────

describe('MercadoPagoError hierarchy', () => {
	it('all subtypes extend MercadoPagoError', () => {
		const subtypes = [
			MPBadRequestError, MPAuthenticationError, MPPaymentError,
			MPForbiddenError, MPNotFoundError, MPIdempotencyError,
			MPValidationError, MPResourceLockedError, MPDependencyError,
			MPRateLimitError, MPServerError,
		];
		subtypes.forEach((Cls) => {
			const err = new Cls({ message: 'test', status: 400 });
			expect(err).toBeInstanceOf(MercadoPagoError);
			expect(err).toBeInstanceOf(Error);
		});
	});

	it('all subtypes extend Error (backward compat)', () => {
		const err = new MPNotFoundError({ message: 'not found', status: 404 });
		expect(err).toBeInstanceOf(Error);
		expect(err.status).toBe(404);
		expect(err.message).toBe('not found');
	});

	it('catch by base type catches subtype', () => {
		const err = new MPAuthenticationError({ message: 'unauthorized', status: 401 });
		let caught = false;
		try { throw err; } catch (e) {
			if (e instanceof MercadoPagoError) caught = true;
		}
		expect(caught).toBe(true);
	});

	it('MPRateLimitError stores retryAfter in seconds', () => {
		const err = new MPRateLimitError({ status: 429, message: '' }, 45);
		expect(err.retryAfter).toBe(45);
	});

	it('MPRateLimitError null retryAfter when absent', () => {
		const err = new MPRateLimitError({ status: 429, message: '' });
		expect(err.retryAfter).toBeNull();
	});

	it('MPConnectionError wraps cause', () => {
		const cause = new Error('DNS timeout');
		const err = new MPConnectionError(cause);
		expect(err).toBeInstanceOf(MercadoPagoError);
		expect(err.status).toBe(0);
	});
});

// ─── buildError() factory ─────────────────────────────────────────────────────

describe('buildError factory', () => {
	const cases: [number, unknown][] = [
		[400, MPBadRequestError],
		[401, MPAuthenticationError],
		[402, MPPaymentError],
		[403, MPForbiddenError],
		[404, MPNotFoundError],
		[409, MPIdempotencyError],
		[422, MPValidationError],
		[423, MPResourceLockedError],
		[424, MPDependencyError],
		[429, MPRateLimitError],
		[500, MPServerError],
		[503, MPServerError],
		[418, MercadoPagoError],
	];

	test.each(cases)('status %i → %s', (status, Cls) => {
		const err = buildError(status, { message: 'test' });
		// eslint-disable-next-line @typescript-eslint/ban-types
		expect(err).toBeInstanceOf(Cls as unknown as new (...args: unknown[]) => unknown);
	});

	it('429 with retryAfter creates MPRateLimitError with seconds', () => {
		const err = buildError(429, {}, 30);
		expect(err).toBeInstanceOf(MPRateLimitError);
		expect((err as MPRateLimitError).retryAfter).toBe(30);
	});
});

// ─── AppConfig DEFAULT constants ─────────────────────────────────────────────

describe('AppConfig DEFAULT constants', () => {
	it('DEFAULT_TIMEOUT is 60 000 ms', () => {
		expect(AppConfig.DEFAULT_TIMEOUT).toBe(60000);
	});

	it('DEFAULT_RETRIES is 3', () => {
		expect(AppConfig.DEFAULT_RETRIES).toBe(3);
	});

	it('DEFAULT_RETRY_ON includes 429', () => {
		expect(AppConfig.DEFAULT_RETRY_ON).toContain(429);
	});

	it('DEFAULT_RETRY_ON includes 500, 502, 503, 504', () => {
		[500, 502, 503, 504].forEach((code) => {
			expect(AppConfig.DEFAULT_RETRY_ON).toContain(code);
		});
	});
});

// ─── Auto-pagination ─────────────────────────────────────────────────────────

describe('createAutoPagingIterable', () => {
	it('yields all items from a single page', async () => {
		const page = { paging: { total: 2, limit: 2, offset: 0 }, results: [{ id: '1' }, { id: '2' }] };
		const searchFn = jest.fn().mockResolvedValue(page);

		const items: unknown[] = [];
		for await (const item of createAutoPagingIterable(searchFn)) {
			items.push(item);
		}
		expect(items).toHaveLength(2);
		expect(searchFn).toHaveBeenCalledTimes(1);
	});

	it('fetches multiple pages until exhausted', async () => {
		const searchFn = jest.fn()
			.mockResolvedValueOnce({ paging: { total: 2, limit: 1, offset: 0 }, results: [{ id: '1' }] })
			.mockResolvedValueOnce({ paging: { total: 2, limit: 1, offset: 1 }, results: [{ id: '2' }] })
			.mockResolvedValueOnce({ paging: { total: 2, limit: 1, offset: 2 }, results: [] });

		const items: unknown[] = [];
		for await (const item of createAutoPagingIterable(searchFn, {}, 1)) {
			items.push(item);
		}
		expect(items).toHaveLength(2);
	});

	it('stops immediately on empty results', async () => {
		const searchFn = jest.fn().mockResolvedValue({ paging: { total: 0, limit: 100, offset: 0 }, results: [] });
		const items: unknown[] = [];
		for await (const item of createAutoPagingIterable(searchFn)) {
			items.push(item);
		}
		expect(items).toHaveLength(0);
		expect(searchFn).toHaveBeenCalledTimes(1);
	});
});
