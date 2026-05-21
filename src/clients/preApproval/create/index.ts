import { RestClient } from '@utils/restClient';

import type { PreApprovalCreateClient } from './types';
import type { PreApprovalResponse } from '@src/clients/preApproval/commonTypes';

export default function create({ body, config }: PreApprovalCreateClient): Promise<PreApprovalResponse> {
	return RestClient.fetch<PreApprovalResponse>(
		'/preapproval/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
