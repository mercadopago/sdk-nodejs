import { RestClient } from '@src/utils/restClient';

import type { GetDevicesResponse } from '../commonTypes';
import type { PointGetDevicesClient } from './types';

export default function getDevices({ filters, config }: PointGetDevicesClient): Promise<GetDevicesResponse> {
	return RestClient.fetch<GetDevicesResponse>(
		'/point/integration-api/devices',
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			queryParams: {
				...filters,
			},
			...config.options,
		}
	);
}
