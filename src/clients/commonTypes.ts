/**
 * Shared domain types reused across multiple API clients.
 *
 * These types represent common MercadoPago data structures (addresses,
 * identification documents, items, shipments, etc.) that appear in the
 * request or response payloads of several endpoints.
 *
 * @module clients/commonTypes
 */

/**
 * Personal or business identification document.
 *
 * Used in payer, cardholder, and passenger contexts wherever the API
 * requires a government-issued ID.
 */
export declare type Identification = {
	/** Document type code (e.g. `CPF`, `DNI`, `CNPJ`). */
	type?: string;
	/** Document number as a string to preserve leading zeros. */
	number?: string;
	/** Numeric representation of the identification (legacy field). */
	identification?: number;
};

/**
 * Basic street address used in payer and shipment contexts.
 */
export declare type Address = {
	/** Postal / ZIP code. */
	zip_code?: string;
	/** Street name. */
	street_name?: string;
	/** Street number. */
	street_number?: string;
};

/**
 * Line item within a payment, preference, or order.
 *
 * Represents a single product or service being purchased.
 */
export declare type Items = {
	/** Unique item identifier (set by the integrator). */
	id: string;
	/** Short human-readable title shown to the buyer. */
	title: string;
	/** Extended description of the item. */
	description?: string;
	/** URL of the item image. */
	picture_url?: string;
	/** MercadoPago category identifier (used for fraud analysis). */
	category_id?: string;
	/** Number of units being purchased (must be >= 1). */
	quantity: number;
	/** ISO 4217 currency code (e.g. `ARS`, `BRL`, `MXN`). */
	currency_id?: string;
	/** Price per unit in the specified currency. */
	unit_price: number;
	/** Whether the item carries a warranty. */
	warranty?: boolean;
	/** Industry-specific descriptor for travel / events. */
	category_descriptor?: CategoryDescriptor;
	/** Date of the event or service in ISO 8601 format. */
	event_date?: string;
};

/**
 * Phone number split into area code and local number.
 */
export declare type Phone = {
	/** Area / country dialling code. */
	area_code?: string;
	/** Local phone number. */
	number?: string;
}

/**
 * Shipping configuration for a payment or preference.
 */
export declare type Shipments = {
	/** Shipping mode (e.g. `custom`, `me2`, `not_specified`). */
	mode?: string;
	/** Whether local (in-store) pickup is available. */
	local_pickup?: boolean;
	/** Package dimensions in `height x width x length, weight` format. */
	dimensions?: string;
	/** Default shipping method identifier. */
	default_shipping_method?: number;
	/** Shipping methods offered at no cost to the buyer. */
	free_methods?: Array<FreeMethods>;
	/** Fixed shipping cost in the transaction currency. */
	cost?: number;
	/** Whether shipping is free for the buyer. */
	free_shipping?: boolean;
	/** Delivery destination address. */
	receiver_address?: ReceiverAddress;
	/** Whether express (expedited) shipping is enabled. */
	express_shipment?: boolean;
};

/**
 * Identifier for a free shipping method.
 */
export declare type FreeMethods = {
	/** Shipping method ID eligible for free shipping. */
	id?: number;
};

/**
 * Full delivery address including apartment-level detail.
 */
export declare type ReceiverAddress = {
	/** Postal / ZIP code. */
	zip_code?: string;
	/** Street name. */
	street_name?: string;
	/** Street number. */
	street_number?: string;
	/** Floor or level within the building. */
	floor?: string;
	/** Apartment or unit identifier. */
	apartment?: string;
	/** City name. */
	city_name?: string;
	/** State or province name. */
	state_name?: string;
	/** Country name. */
	country_name?: string;
};

/**
 * Pagination metadata returned by search / list endpoints.
 */
export declare type Paging = {
	/** Total number of matching records. */
	total?: number;
	/** Current offset within the result set. */
	offset?: number;
	/** Maximum number of records returned per page. */
	limit?: number;
};

/**
 * Cardholder information associated with a saved customer card.
 */
export declare type CustomerCardCardholder = {
	/** Full name as printed on the card. */
	name?: string;
	/** Cardholder identification document. */
	identification?: Identification;
};

/**
 * Tax line applied to a payment.
 */
export declare type Tax = {
	/** Tax type (e.g. `IVA`, `ISR`). */
	type?: string;
	/** Tax amount in the transaction currency. */
	value?: number;
};

/**
 * Differential pricing identifier for marketplace splits.
 */
export declare type DifferentialPricing = {
	/** Differential pricing configuration ID. */
	id?: number;
};

/**
 * Industry-specific metadata for travel and event tickets.
 *
 * Attached to an {@link Items} entry to provide fraud-analysis data
 * required by the airline / events vertical.
 */
export declare type CategoryDescriptor = {
	/** Passenger travelling (airline vertical). */
	passenger?: Passenger;
	/** Route details (airline vertical). */
	route?: Route;
	/** Event date in ISO 8601 format. */
	event_date?: string;
	/** Descriptor type (e.g. `travel`, `event`). */
	type?: string;
};

/**
 * Passenger information for airline-industry payments.
 */
export declare type Passenger = {
	/** Passenger first name. */
	first_name?: string;
	/** Passenger last name. */
	last_name?: string;
	/** Passenger identification document. */
	identification?: Identification;
};

/**
 * Flight route details for airline-industry payments.
 */
export declare type Route = {
	/** Departure airport or city. */
	departure?: string;
	/** Arrival airport or city. */
	destination?: string;
	/** Scheduled departure date-time in ISO 8601 format. */
	departure_date_time?: string;
	/** Scheduled arrival date-time in ISO 8601 format. */
	arrival_date_time: string;
	/** Origin airport or station identifier. */
	origin_id?: string;
	/** Destination airport or station identifier. */
	destination_id?: string;
	/** Airline or transport company name. */
	company?: string;
};
