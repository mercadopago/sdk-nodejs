export declare type Config = {
  accessToken: string;
  options?: Options;
};

export declare type Options = {
  timeout?: number;
  idempotencyKey?: string;
};

export declare interface ApiResponse {
  api_response: ResponseFields;
}

export declare type ResponseFields = {
  status: number;
  headers: [string, string[]];
};