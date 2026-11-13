/**
 * Request types for retrieving a store.
 *
 * @module store/get/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';
export type { StoreResponse } from '../create/types';

/** Internal parameters passed to the `get` implementation function. */
export declare type StoreGetClient = {
	/** Unique identifier of the store to retrieve. */
	storeId: string | number;
	/** SDK configuration with access token and HTTP options. */
	config: MercadoPagoConfig;
};

/** Public input for {@link Store.get}, accepted by the class facade for `GET /stores/{id}`. */
export declare type StoreGetData = {
	/** Unique identifier of the store to retrieve. */
	storeId: string | number;
	/** Optional HTTP overrides (timeouts, idempotency key, etc.). */
	requestOptions?: Options;
};
