/**
 * Request types for updating a store.
 *
 * @module store/update/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Options } from '@src/types';

/** Internal parameters passed to the `update` implementation function. */
export declare type StoreUpdateClient = {
	/** Unique identifier of the user (seller) that owns the store. */
	userId: string | number;
	/** Unique identifier of the store to update. */
	storeId: string | number;
	/** SDK configuration with access token and HTTP options. */
	config: MercadoPagoConfig;
	/** Fields to update on the store. */
	body: StoreUpdateBody;
};

/** Public input for {@link Store.update}, accepted by the class facade. */
export declare type StoreUpdateData = {
	/** Unique identifier of the user (seller) that owns the store. */
	userId: string | number;
	/** Unique identifier of the store to update. */
	storeId: string | number;
	/** Fields to update on the store. */
	body: StoreUpdateBody;
	/** Optional HTTP overrides (timeouts, idempotency key, etc.). */
	requestOptions?: Options;
};

/** Body payload for updating an existing store. */
export declare type StoreUpdateBody = {
	/** Store name. */
	name?: string;
	/** Store business hours and location details. */
	business_hours?: object;
	/** Store location details. */
	location?: object;
};

/** Response representing an updated store. */
export declare type StoreUpdateResponse = {
	/** Unique store identifier. */
	id: number;
	/** MercadoPago user ID of the store owner. */
	user_id: number;
	/** Store name. */
	name: string;
	/** Store location details. */
	location?: object;
	/** ISO 8601 timestamp when the store was created. */
	date_created: string;
	/** ISO 8601 timestamp of the last modification. */
	date_last_updated: string;
	/** Store business hours. */
	business_hours?: object;
	/** Additional store information. */
	[key: string]: unknown;
};
