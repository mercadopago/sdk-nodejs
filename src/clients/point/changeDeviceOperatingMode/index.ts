import { RestClient } from '@src/utils/restClient';

import type { ChangeDeviceOperatingModeResponse } from '../commonTypes';
import type { PointChangeDeviceOperatingModeClient } from './types';

export default function changeDeviceOperatingMode({ device_id, request, config }: PointChangeDeviceOperatingModeClient): Promise<ChangeDeviceOperatingModeResponse> {
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
