/**
 * Implementation of the change-device-operating-mode operation.
 *
 * Sends a `PATCH /point/integration-api/devices/{device_id}` request to
 * switch a Point terminal between integrated (PDV) and standalone modes.
 *
 * @module point/changeDeviceOperatingMode
 */

import { RestClient } from '@src/utils/restClient';

import type { ChangeDeviceOperatingModeResponse } from '../commonTypes';
import type { PointChangeDeviceOperatingModeClient } from './types';

/**
 * Change the operating mode of a Point device.
 *
 * @returns Confirmation containing the new operating mode.
 */
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
