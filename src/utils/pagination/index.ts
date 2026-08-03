/**
 * Auto-paging utilities for MercadoPago search endpoints.
 *
 * Returns an `AsyncIterable<T>` that lazily fetches pages of results so
 * callers can iterate over every item with a `for await...of` loop without
 * manually managing offset/limit.
 *
 * Example:
 * ```ts
 * const payment = new Payment(config);
 * for await (const p of payment.searchAll({ status: 'approved' })) {
 *     console.log(p.id);
 * }
 * ```
 */
import type { PageResult } from './types';

const DEFAULT_PAGE_SIZE = 100;

type SearchFn<TResult, TOptions> = (options?: TOptions) => Promise<PageResult<TResult>>;

/**
 * Creates an `AsyncIterable<TResult>` that auto-fetches all pages.
 *
 * Supports both offset/limit pagination (Pattern A) and page/page_size
 * pagination (Pattern B, used by some Order endpoints).
 *
 * @param searchFn     Callable that accepts search options and returns one page.
 * @param baseOptions  Initial search options. `limit`/`offset` are managed automatically.
 * @param pageSize     Items per page. Defaults to 100.
 */
export function createAutoPagingIterable<TResult, TOptions extends Record<string, unknown>>(
	searchFn: SearchFn<TResult, TOptions>,
	baseOptions?: TOptions,
	pageSize = DEFAULT_PAGE_SIZE,
): AsyncIterable<TResult> {
	return {
		[Symbol.asyncIterator](): AsyncIterator<TResult> {
			let offset = (baseOptions?.offset as number | undefined) ?? 0;
			let page = 1;
			let buffer: TResult[] = [];
			let bufferIndex = 0;
			let done = false;
			let total: number | null = null;

			const fetchNextPage = async (): Promise<void> => {
				if (done) return;

				const options = {
					...baseOptions,
					limit: pageSize,
					offset,
				} as TOptions;

				const result = await searchFn(options);

				// Pattern A: offset/limit with paging.total
				if (result.results !== undefined) {
					const items = result.results ?? [];
					buffer = items;
					bufferIndex = 0;

					if (total === null && result.paging) {
						total = result.paging.total;
					}

					offset += items.length;

					if (items.length === 0 || (total !== null && offset >= total)) {
						done = true;
					}
					return;
				}

				// Pattern B: page/page_size with elements (Orders)
				if (result.elements !== undefined) {
					const items = result.elements ?? [];
					buffer = items;
					bufferIndex = 0;

					if (total === null) total = result.total ?? 0;

					page++;
					offset = (page - 1) * pageSize;

					if (items.length === 0 || offset >= (total ?? 0)) {
						done = true;
					}
					return;
				}

				done = true;
			};

			return {
				async next(): Promise<IteratorResult<TResult>> {
					if (bufferIndex < buffer.length) {
						return { value: buffer[bufferIndex++], done: false };
					}
					if (done) {
						return { value: undefined as unknown as TResult, done: true };
					}
					await fetchNextPage();
					if (bufferIndex < buffer.length) {
						return { value: buffer[bufferIndex++], done: false };
					}
					return { value: undefined as unknown as TResult, done: true };
				},
			};
		},
	};
}
