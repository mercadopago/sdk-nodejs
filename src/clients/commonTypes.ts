export declare type Identification = {
  type?: string;
  number?: string;
  identification?: number;
};

export declare type Address = {
  zip_code?: string;
  street_name?: string;
  street_number?: number;
};

export declare type Items = {
  id: string;
  title: string;
  description?: string;
  picture_url?: string;
  category_id?: string;
  quantity: number;
  currency_id?: string;
  unit_price: number;
};

export declare type Phone = {
  area_code?: string,
  number?: string
}

export declare type Shipments = {
  mode?: string;
  local_pickup?: boolean;
  dimensions?: string;
  default_shipping_method?: number;
  free_methods?: Array<FreeMethods>;
  cost?: number;
  free_shipping?: boolean;
  receiver_address?: ReceiverAddress;
  express_shipment?: boolean;
};

export declare type FreeMethods = {
  id?: number;
};

export declare type ReceiverAddress = {
  zip_code?: string;
  street_name?: string;
  street_number?: number;
  floor?: string;
  apartment?: string;
  city_name?: string;
  state_name?: string;
  country_name?: string;
};

export declare type Paging = {
  total?: number;
  offset?: number;
  limit?: number;
};

export declare type CustomerCardCardholder = {
  name?: string;
  identification?: Identification;
};
