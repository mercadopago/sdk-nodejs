/**
 * Forward Data types for Mercado Pago Payment API
 * These types define the structure for forwarding payment data to sub-merchants
 */

export declare type SubMerchant = {
  sub_merchant_id?: string;
  mcc?: string;
  country?: string;
  address_door_number?: number;
  zip?: string;
  document_number?: string;
  city?: string;
  address_street?: string;
  business_name?: string;
  region_code_iso?: string;
  region_code?: string;
  document_type?: string;
  phone?: string;
  url?: string;
  legal_name?: string;
};

export declare type NetworkTransactionData = {
  network_transaction_id?: string;
};

export declare type ForwardData = {
  sub_merchant?: SubMerchant;
  network_transaction_data?: NetworkTransactionData;
}; 