import { RestClient } from '@utils/restClient';
import type { CreatePreApprovalRequest } from './types';
import type { PreApprovalResponse } from '@src/clients/preApproval/commonTypes';

export default function create({ preApprovalRequest, config }: CreatePreApprovalRequest): Promise<PreApprovalResponse> {
	return RestClient.fetch<PreApprovalResponse>(
		'/preapproval/',
		{
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(preApprovalRequest),
			...config.options
		}
	);
}
