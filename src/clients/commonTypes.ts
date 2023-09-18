export declare type Identification = {
  type: string;
  number: string;
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
  area_code: string,
  number: string
}

export declare type Paging = {
  total: number;
  offset: number;
  limit: number;
};