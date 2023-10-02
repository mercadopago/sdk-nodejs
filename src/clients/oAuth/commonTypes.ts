import { ApiResponse } from '@src/types';

export declare interface OAuthResponse extends ApiResponse {
  access_token?: string;
  public_key?: string;
  refresh_token?: string;
  live_mode?: boolean;
  user_id?: number;
  token_type?: string;
  expires_in?: number;
  scope?: string;
}
