import { RestClient } from '@src/utils/restClient';
import { GetDevicesResponse } from '../commonTypes';
import { Search } from './types';

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
				'Content-Type': 'application/json',
			},
			queryParams: {
				...filters,
			},
			...config.options,
		}
	);
}
