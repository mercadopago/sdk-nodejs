import { ApiResponse } from '@src/types';

export declare type ChargebackDocumentation = {
	type?: string;
	url?: string;
	description?: string;
}

export declare interface ChargebackResponse extends ApiResponse {
	id?: string;
	payments?: Array<any>;
	currency?: string;
	amount?: string;
	coverage_applied?: string;
	coverage_elegible?: string;
	documentation_required?: string;
	documentation_status?: string;
	documentation?: Array<ChargebackDocumentation>;
	date_documentation_deadline?: string;
	date_created?: string;
	date_last_updated?: string;
	live_mode?: string;
} 