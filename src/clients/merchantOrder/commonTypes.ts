/**
 * Shared domain types for the Merchant Order client.
 *
 * Contains response interfaces, request payloads, and supporting types
 * for orders that group one or more payments, items, and shipments.
 *
 * @module merchantOrder/commonTypes
 */

import type { ApiResponse } from '@src/types';

/** Full response representing a merchant order. */
export declare interface MerchantOrderResponse extends ApiResponse {
  /** Unique merchant order identifier. */
  id?: number;
  /** Checkout preference that originated this order. */
  preference_id?: string;
  /** Application ID that created the order. */
  application_id?: string;
  /** Order status (e.g. `opened`, `closed`). */
  status?: string;
  /** MercadoPago site identifier (e.g. `MLA`, `MLB`). */
  site_id?: string;
  /** Buyer information. */
  payer?: MerchantOrderPayer;
  /** Seller (payment collector) information. */
  collector?: MerchantOrderCollector;
  /** Sponsor (marketplace) identifier. */
  sponsor_id?: string;
  /** Payments associated with this order. */
  payments?: MerchantOrderPayment[];
  /** Total amount already paid. */
  paid_amount?: number;
  /** Total amount refunded across all payments. */
  refunded_amount?: number;
  /** Shipping cost charged to the buyer. */
  shipping_cost?: number;
  /** ISO 8601 timestamp when the order was created. */
  date_created?: string;
  /** Whether the order has been cancelled. */
  cancelled?: boolean;
  /** Line items included in the order. */
  items?: MerchantOrderItem[];
  /** Shipment details for physical goods. */
  shipments?: MerchantOrderShipment[];
  /** URL that receives webhook notifications about order updates. */
  notification_url?: string;
  /** Free-form text with extra information about the order. */
  additional_info?: string;
  /** Integrator's external reference for reconciliation. */
  external_reference?: string;
  /** Marketplace identifier (e.g. `NONE`, marketplace name). */
  marketplace?: string;
  /** Sum of all item unit prices times their quantities. */
  total_amount?: number;
  /** Aggregated order status considering all payments. */
  order_status?: string;
  /** ISO 8601 timestamp of the last update. */
  last_updated?: string;
  /** Whether this order was created in sandbox mode. */
  is_test: boolean;
}

/** Buyer (payer) summary within a merchant order response. */
export declare type MerchantOrderPayer = {
  /** MercadoPago user ID of the buyer. */
  id?: number;
  /** Buyer's nickname on the platform. */
  nickname?: string;
};

/** Seller (collector) summary within a merchant order response. */
export declare type MerchantOrderCollector = {
  /** MercadoPago user ID of the seller. */
  id?: number;
  /** Seller's nickname on the platform. */
  nickname?: string;
};

/** Payment associated with a merchant order. */
export declare type MerchantOrderPayment = {
  /** Unique payment identifier. */
  id?: number;
  /** Net amount of the payment (excluding shipping). */
  transaction_amount?: number;
  /** Total amount paid by the buyer (including fees). */
  total_paid_amount?: number;
  /** Shipping cost included in this payment. */
  shipping_cost?: number;
  /** ISO 4217 currency code. */
  currency_id?: string;
  /** Payment status (e.g. `approved`, `pending`, `rejected`). */
  status?: string;
  /** Detailed reason for the current payment status. */
  status_details?: string;
  /** Type of payment operation (e.g. `regular_payment`). */
  operation_type?: string;
  /** ISO 8601 timestamp when the payment was approved. */
  date_approved?: string;
  /** ISO 8601 timestamp when the payment was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last payment modification. */
  last_modified?: string;
  /** Amount refunded from this payment. */
  amount_refunded?: number;
};

/** Line item within a merchant order response. */
export declare type MerchantOrderItem = {
  /** Unique item identifier. */
  id?: string;
  /** Short item title. */
  title?: string;
  /** Extended item description. */
  description?: string;
  /** URL of the item image. */
  pictureUrl?: string;
  /** MercadoPago product category identifier. */
  categoryId?: string;
  /** Number of units. */
  quantity?: number;
  /** Price per unit. */
  unit_price?: number;
  /** ISO 4217 currency code. */
  currency_id?: string;
};

/** Shipment record within a merchant order response. */
export declare type MerchantOrderShipment = {
  /** Unique shipment identifier. */
  id?: number;
  /** Shipping carrier type. */
  shipping_type?: string;
  /** Shipping mode (e.g. `me2`, `custom`). */
  shipping_mode?: string;
  /** Pickup type for the shipment. */
  picking_type?: string;
  /** Current shipment status. */
  status?: string;
  /** Detailed sub-status of the shipment. */
  shipping_sub_status?: string;
  /** Items included in this shipment. */
  items?: object;
  /** ISO 8601 timestamp when the shipment was created. */
  date_created?: string;
  /** ISO 8601 timestamp of the last modification. */
  last_modified?: string;
  /** ISO 8601 timestamp when the shipping label was first printed. */
  date_first_printed?: string;
  /** Carrier service identifier. */
  service_id?: string;
  /** MercadoPago user ID of the sender (seller). */
  sender_id?: number;
  /** MercadoPago user ID of the receiver (buyer). */
  receiver_id?: number;
  /** Delivery destination address. */
  receiver_address?: MerchantOrderReceiverAddress;
  /** Selected shipping option with cost and speed. */
  shipping_option?: MerchantOrderShippingOption;
};

/** Delivery address for a merchant order shipment. */
export declare type MerchantOrderReceiverAddress = {
  /** Address identifier. */
  id: number;
  /** Full address line. */
  addressLine: string;
  /** Apartment or unit. */
  apartment: string;
  /** City details. */
  city: MerchantOrderReceiverAddressCity;
  /** State / province details. */
  state: MerchantOrderReceiverAddressState;
  /** Country details. */
  country: MerchantOrderReceiverAddressCountry;
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
};

/** Shipping option selected for the merchant order shipment. */
export declare type MerchantOrderShippingOption = {
  /** Shipping option identifier. */
  id: number;
  /** Actual shipping cost charged. */
  cost: number;
  /** ISO 4217 currency code for the cost. */
  currency_id: string;
  /** Estimated delivery window. */
  estimated_delivery: MerchantOrderShippingEstimateDelivery
  /** Published list price of the shipping option. */
  list_cost: number;
  /** Display name of the shipping option. */
  name: string;
  /** Identifier of the shipping method/carrier. */
  shipping_method_id: number;
  /** Speed metrics (handling + shipping times). */
  speed: MerchantOrderShippingSpeed;
};

/** City within a merchant order receiver address. */
export declare type MerchantOrderReceiverAddressCity = {
  /** City identifier. */
  id: string;
  /** City name. */
  name: string;
}

/** State / province within a merchant order receiver address. */
export declare type MerchantOrderReceiverAddressState = {
  /** State identifier. */
  id: string;
  /** State name. */
  name: string;
}

/** Country within a merchant order receiver address. */
export declare type MerchantOrderReceiverAddressCountry = {
  /** Country identifier (ISO 3166-1). */
  id: string;
  /** Country name. */
  name: string;
}

/** Estimated delivery window for a shipping option. */
export declare type MerchantOrderShippingEstimateDelivery = {
  /** Estimated delivery date in ISO 8601 format. */
  date: string;
  /** Start of the delivery time window (HH:mm format). */
  time_from: string;
  /** End of the delivery time window (HH:mm format). */
  time_to: string;
}

/** Speed metrics for a shipping option. */
export declare type MerchantOrderShippingSpeed = {
  /** Handling time in hours before the package ships. */
  handling: number;
  /** Transit time in hours from shipment to delivery. */
  shipping: number;
}

/** Line item request payload for creating or updating a merchant order. */
export declare type MerchantOrderItemRequest = {
  /** Unique item identifier. */
  id?: string;
  /** Short item title. */
  title?: string;
  /** Extended item description. */
  description?: string;
  /** URL of the item image. */
  picture_url?: string;
  /** MercadoPago product category identifier. */
  category_id?: string;
  /** Number of units. */
  quantity?: number;
  /** Price per unit. */
  unit_price?: number;
  /** ISO 4217 currency code. */
  currency_id?: string;
}

/** Payer information in a merchant order create/update request. */
export declare type MerchantOrderPayerRequest = {
  /** MercadoPago user ID of the buyer. */
  id: number;
  /** Buyer's nickname on the platform. */
  nickname: string;
}

/** Collector (seller) identifier for a merchant order request. */
export declare type Collector = {
  /** MercadoPago user ID of the payment collector (seller). */
  id: number
}
