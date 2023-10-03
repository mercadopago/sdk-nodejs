import { RestClient } from '@utils/restClient';
import type { OAuthGetAuthorizationURLClient } from './types';

export default function getAuthorizationURL({ options }: OAuthGetAuthorizationURLClient): string {
	const defaultOptions =
		{
			...options,
			response_type: 'code',
			platform_id: 'mp',
		};

	const AUTH_HOST = 'https://auth.mercadopago.com/authorization';
	return RestClient.appendQueryParamsToUrl(AUTH_HOST, defaultOptions);
}
