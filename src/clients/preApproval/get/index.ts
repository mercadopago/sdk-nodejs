import { RestClient } from '@utils/restClient';
import type { GetPreApprovalRequest } from './types';
import type { PreApprovalResponse } from '@src/clients/preApproval/commonTypes';

export default function get({ id, config }: GetPreApprovalRequest): Promise<PreApprovalResponse> {
	return RestClient.fetch<PreApprovalResponse>(
		`/preapproval/${id}`,
		{
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			...config.options
		}
	);
}
