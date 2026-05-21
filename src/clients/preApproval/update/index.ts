import { RestClient } from '@utils/restClient';

import type { PreApprovalUpdateClient, PreApprovalUpdateResponse } from './types';

export default function update({ id, body, config }: PreApprovalUpdateClient): Promise<PreApprovalUpdateResponse> {
	return RestClient.fetch<PreApprovalUpdateResponse>(
		`/preapproval/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
