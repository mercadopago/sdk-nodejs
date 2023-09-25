import { RestClient } from '@utils/restClient';
import type { UpdatePreApproval, PreApprovalUpdateResponse } from './types';

export default function update({ id, body, config }: UpdatePreApproval): Promise<PreApprovalUpdateResponse> {
	return RestClient.fetch<PreApprovalUpdateResponse>(
		`/preapproval/${id}`,
		{
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${config.accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			...config.options
		}
	);
}
