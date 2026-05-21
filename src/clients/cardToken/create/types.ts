/**
 * Request types for creating a card token.
 *
 * @module cardToken/create/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { Options } from '@src/types';

/** Internal parameters passed to the `create` implementation function. */
export declare type CardTokenCreateClient = {
	/** Card data to tokenize. */
	body: CardTokenCreateBody;
	/** SDK configuration with access token and HTTP options. */
	config: MercadoPagoConfig;
};

/** Body payload for tokenizing a card. */
export declare type CardTokenCreateBody = {
	/** Identifier of a previously saved card (alternative to raw card data). */
	card_id?: string;
	/** Full card number (PAN) to tokenize. */
	card_number?: string;
	/** MercadoPago customer ID that owns the saved card. */
	customer_id?: string;
	/** Card expiration month as a string (e.g. `"01"` through `"12"`). */
	expiration_month?: string;
	/** Card expiration year as a string (four-digit, e.g. `"2026"`). */
	expiration_year?: string;
	/** Card security code (CVV/CVC). */
	security_code?: string;
};

/** Public input for {@link CardToken.create}, accepted by the class facade. */
export declare type CardTokenCreateData = {
	/** Card data to tokenize. */
	body: CardTokenCreateBody;
	/** Optional HTTP overrides (timeouts, idempotency key, etc.). */
	requestOptions?: Options;
};
