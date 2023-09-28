import { RestClient } from '@utils/restClient';
import type { OAuthGetAuthorizationURLClient } from './types';

export default function getAuthorizationURL({ filters }: OAuthGetAuthorizationURLClient): string {
	const defaultFilters =
		{
			...filters,
			response_type: 'code',
			platform_id: 'mp',
		};

	const AUTH_HOST = 'https://auth.mercadopago.com/authorization';
	return RestClient.appendQueryParamsToUrl(AUTH_HOST, defaultFilters);
}
