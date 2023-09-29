export declare type OAuthGetAuthorizationURLClient = {
  filters: AuthorizationRequest;
};

export declare type AuthorizationRequest = {
  client_id?: string;
  state?: string;
  redirect_uri?: string;
};

export declare type AuthorizationResponse = {
  authorization_url: string;
};

export declare type OAuthGetAuthorizationURLData = {
  filters?: AuthorizationRequest;
}
