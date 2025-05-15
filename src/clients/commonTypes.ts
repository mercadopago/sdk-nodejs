export declare type Identification = {
	type?: string;
	number?: string;
	identification?: number;
};

export declare type Address = {
	zip_code?: string;
	street_name?: string;
	street_number?: string;
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
	warranty?: boolean;
	category_descriptor?: CategoryDescriptor;
};

export declare type Phone = {
	area_code?: string;
	number?: string;
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
	street_number?: string;
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

export declare type Tax = {
	type?: string;
	value?: number;
};

export declare type DifferentialPricing = {
	id?: number;
};

export declare type CategoryDescriptor = {
	passenger?: Passenger;
	route?: Route;
	event_date?: string;
	type?: string;
};

export declare type Passenger = {
	first_name?: string;
	last_name?: string;
	identification?: Identification;
};

export declare type Route = {
	departure?: string;
	destination?: string;
	departure_date_time?: string;
	arrival_date_time: string;
	origin_id?: string;
	destination_id?: string;
	company?: string;
};
