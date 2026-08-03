/**
 * Implementation of the OAuth authorization URL builder.
 *
 * Constructs the full `https://auth.mercadopago.com/authorization` URL
 * with the required query parameters so the seller can grant permissions
 * to the integrator's application.
 *
 * @module oAuth/getAuthorizationURL
 */

import { RestClient } from '@utils/restClient';
import type { OAuthGetAuthorizationURLClient } from './types';

/**
 * Build and return the MercadoPago OAuth authorization URL as a string.
 *
 * @returns Fully-qualified authorization URL including all query parameters.
 */
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
