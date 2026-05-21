/**
 * Request types for updating a merchant order.
 *
 * @module merchantOrder/update/types
 */

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { Collector, MerchantOrderItemRequest, MerchantOrderPayerRequest } from '../commonTypes';
import type { Options } from '@src/types';

/** Internal parameters passed to the `update` implementation function. */
export declare type MerchantOrderUpdateClient = {
  /** Unique identifier of the merchant order to update. */
  merchantOrderId: string | number;
  /** SDK configuration with access token and HTTP options. */
  config: MercadoPagoConfig;
  /** Fields to update on the merchant order. */
  body: MerchantOrderUpdateBody;
}

/** Public input for {@link MerchantOrder.update}, accepted by the class facade. */
export declare type MerchantOrderUpdateData = {
  /** Unique identifier of the merchant order to update. */
  merchantOrderId: string | number;
  /** Fields to update on the merchant order. */
  body: MerchantOrderUpdateBody;
  /** Optional HTTP overrides (timeouts, idempotency key, etc.). */
  requestOptions?: Options;
}

/** Body payload for updating an existing merchant order. */
export declare type MerchantOrderUpdateBody = {
  /** MercadoPago site identifier (e.g. `MLA`, `MLB`). */
  site_id?: string;
  /** Updated buyer information. */
  payer?: MerchantOrderPayerRequest
  /** Sponsor (marketplace) identifier. */
  sponsor_id?: string;
  /** Updated line items for the order. */
  items?: MerchantOrderItemRequest[];
  /** Updated shipment details. */
  shipments?: MerchantOrderShipmentRequest[];
  /** URL to receive webhook notifications about order updates. */
  notification_url?: string;
  /** Free-form text with extra information about the order. */
  additional_info?: string;
  /** Integrator's external reference for reconciliation. */
  external_reference?: string;
  /** Marketplace identifier. */
  marketplace?: string;
  /** Checkout preference ID associated with the order. */
  preference_id?: string;
  /** Seller (payment collector) for the order. */
  collector?: Collector;
  /** Application ID that manages the order. */
  application_id?: string;
  /** Order version for optimistic concurrency control. */
  version?: number;
}

/** Shipment request payload for a merchant order update. */
export declare type MerchantOrderShipmentRequest = {
  /** Unique shipment identifier. */
  id: number;
  /** Shipping carrier type. */
  shipping_type: string;
  /** Shipping mode (e.g. `me2`, `custom`). */
  shipping_mode: string;
  /** Pickup type for the shipment. */
  picking_type: string;
  /** Current shipment status. */
  status: string;
  /** Detailed sub-status of the shipment. */
  shipping_substatus: string;
  /** Items included in this shipment. */
  items: object[];
  /** ISO 8601 timestamp when the shipment was created. */
  date_created: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified: string;
  /** ISO 8601 timestamp when the shipping label was first printed. */
  date_first_printed: string;
  /** Carrier service identifier. */
  service_id: string;
  /** MercadoPago user ID of the sender (seller). */
  sender_id: number;
  /** MercadoPago user ID of the receiver (buyer). */
  receiver_id: number;
  /** Delivery destination address. */
  receiver_address: MerchantOrderReceiverAddressRequest;
  /** Selected shipping option with cost and speed. */
  shipping_option: MerchantOrderShippingOptionRequest;
}

/** Delivery address for a merchant order shipment update request. */
export declare type MerchantOrderReceiverAddressRequest = {
  /** Address identifier. */
  id: number;
  /** Full address line. */
  address_line: string;
  /** Apartment or unit. */
  apartment: string;
  /** City details. */
  city: MerchantOrderReceiverAddressCityRequest;
  /** State / province details. */
  state: MerchantOrderReceiverAddressStateRequest;
  /** Country details. */
  country: MerchantOrderReceiverAddressCountryRequest;
  /** Additional delivery instructions. */
  comment: string;
  /** Contact person name. */
  contact: string;
  /** Postal / ZIP code. */
  zip_code: string;
  /** Street name. */
  street_name: string;
  /** Street number. */
  street_number: string;
  /** Floor or level within the building. */
  floor: string;
  /** Contact phone number. */
  phone: string;
  /** Geographic latitude of the address. */
  latitude: string;
  /** Geographic longitude of the address. */
  longitude: string;
}

/** Shipping option for a merchant order shipment update request. */
export declare type MerchantOrderShippingOptionRequest = {
  /** Shipping option identifier. */
  id: number;
  /** Actual shipping cost charged. */
  cost: number;
  /** ISO 4217 currency code for the cost. */
  currency_id: string;
  /** Estimated delivery window. */
  estimated_delivery: MerchantOrderShippingEstimateDeliveryRequest;
  /** Published list price of the shipping option. */
  list_cost: number;
  /** Display name of the shipping option. */
  name: string;
  /** Identifier of the shipping method/carrier. */
  shipping_method_id: number;
  /** Speed metrics (handling + shipping times). */
  speed: MerchantOrderShippingSpeedRequest;
}

/** City in a merchant order receiver address update request. */
export declare type MerchantOrderReceiverAddressCityRequest = {
  /** City identifier. */
  id: string;
  /** City name. */
  name: string;
}

/** State / province in a merchant order receiver address update request. */
export declare type MerchantOrderReceiverAddressStateRequest = {
  /** State identifier. */
  id: string;
  /** State name. */
  name: string;
}

/** Country in a merchant order receiver address update request. */
export declare type MerchantOrderReceiverAddressCountryRequest = {
  /** Country identifier (ISO 3166-1). */
  id: string;
  /** Country name. */
  name: string;
}

/** Estimated delivery window for a shipping option update request. */
export declare type MerchantOrderShippingEstimateDeliveryRequest = {
  /** Estimated delivery date in ISO 8601 format. */
  date: string;
  /** Start of the delivery time window (HH:mm format). */
  time_from: string;
  /** End of the delivery time window (HH:mm format). */
  time_to: string;
}

/** Speed metrics for a shipping option update request. */
export declare type MerchantOrderShippingSpeedRequest = {
  /** Handling time in hours before the package ships. */
  handling: number;
  /** Transit time in hours from shipment to delivery. */
  shipping: number;
}
