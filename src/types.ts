export declare type Config = {
	accessToken: string;
	options?: Options;
};

export declare type Options = {
	timeout?: number;
	idempotencyKey?: string;
	plataformId?: string;
	integratorId?: string;
	corporationId?: string;
	meliSessionId?: string;
	expandResponseNodes?: string;
	cardValidation?: string;
	testToken?: boolean;
};

export declare interface SearchOptions {
	limit?: number;
	offset?: number;
	[key: string]: string | number;
}

export declare interface ApiResponse {
	api_response: ResponseFields;
}

export declare type ResponseFields = {
	status: number;
	headers: [string, string[]];
};
