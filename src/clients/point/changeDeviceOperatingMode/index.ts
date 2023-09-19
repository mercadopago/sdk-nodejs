import { RestClient } from '@src/utils/restClient';
import { ChangeDeviceOperatingModeResponse } from '../commonTypes';
import { ChangeDeviceOperatingMode } from './types';

export default function changeDeviceOperatingMode({
	device_id,
	request,
	config,
}: ChangeDeviceOperatingMode): Promise<ChangeDeviceOperatingModeResponse> {
	return RestClient.fetch<ChangeDeviceOperatingModeResponse>(
		`/point/integration-api/devices/${device_id}`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(request),
			...config.options,
		}
	);
}
