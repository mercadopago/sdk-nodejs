/**
 * Request and response types for the store creation endpoint.
 *
 * @module store/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { ApiResponse, Options } from '@src/types';

/** Internal parameters passed to the `create` implementation function. */
export declare type StoreCreateClient = {
	/** SDK configuration with access token and HTTP options. */
	config: MercadoPagoConfig;
	/** ID of the user (seller) that will own the store. */
	userId: string | number;
	/** Store creation request body. */
	body: StoreCreateBody;
};

/** Request body for `POST /users/{user_id}/stores`. */
export declare type StoreCreateBody = {
	/** Store name. */
	name: string;
	/** Business hours and location details. */
	business_hours?: StoreBusinessHours;
	/** Store location. */
	location?: StoreLocation;
	/** External identifier for the store. */
	external_id?: string;
};

/** Business opening hours for each day of the week. */
export declare type StoreBusinessHours = {
	monday?: StoreDayHours;
	tuesday?: StoreDayHours;
	wednesday?: StoreDayHours;
	thursday?: StoreDayHours;
	friday?: StoreDayHours;
	saturday?: StoreDayHours;
	sunday?: StoreDayHours;
};

/** Opening hours for a single day. */
export declare type StoreDayHours = {
	/** Opening time (e.g. `08:00`). */
	open: string;
	/** Closing time (e.g. `18:00`). */
	close: string;
};

/** Store location details. */
export declare type StoreLocation = {
	/** Street address line. */
	street_name?: string;
	/** Street number. */
	street_number?: string;
	/** City name. */
	city_name?: string;
	/** State or province name. */
	state_name?: string;
	/** Latitude coordinate. */
	latitude?: number;
	/** Longitude coordinate. */
	longitude?: number;
	/** Additional reference for locating the store. */
	reference?: string;
	/** ZIP or postal code. */
	zip_code?: string;
};

/** Response representing a created store. */
export declare interface StoreResponse extends ApiResponse {
	/** Unique store ID. */
	id: string;
	/** ID of the user (seller) that owns the store. */
	user_id: number;
	/** Store name. */
	name: string;
	/** Business hours and location details. */
	business_hours?: StoreBusinessHours;
	/** Store location. */
	location?: StoreLocation;
	/** External identifier for the store. */
	external_id?: string;
	/** ISO 8601 timestamp when the store was created. */
	date_created: string;
}

/** Public input for {@link Store.create}, accepted by the class facade. */
export declare type StoreCreateData = {
	/** ID of the user (seller) that will own the store. */
	userId: string | number;
	/** Store creation request body. */
	body: StoreCreateBody;
	/** Optional HTTP overrides (timeouts, idempotency key, etc.). */
	requestOptions?: Options;
};
