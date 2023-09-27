import { RestClient } from '@src/utils/restClient';

import type { GetDevicesResponse } from '../commonTypes';
import type { Search } from './types';

export default function getDevices({
	filters,
	config,
}: Search): Promise<GetDevicesResponse> {
	return RestClient.fetch<GetDevicesResponse>(
		'/point/integration-api/devices',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			queryParams: {
				...filters,
			},
			...config.options,
		}
	);
}
