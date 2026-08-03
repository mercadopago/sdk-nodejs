/**
 * Subscription Plan (PreApprovalPlan) client for the MercadoPago Node SDK.
 *
 * A PreApprovalPlan is a reusable template that defines the billing terms
 * (frequency, amount, free trial, allowed payment methods) for recurring
 * subscriptions. Individual {@link PreApproval} subscriptions can reference
 * a plan so they inherit its configuration. This module exposes CRUD + search
 * operations against the `/preapproval_plan` endpoint.
 *
 * @module clients/preApprovalPlan
 */

import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreApprovalPlanGetData } from './get/types';
import type { UpdatePreApprovalPlanUpdateData } from './update/types';
import type { PreApprovalPlanSearchResponse, PreApprovalPlanSearchData } from './search/types';
import type { PreApprovalPlanResponse } from './commonTypes';
import type { PreApprovalPlanCreateData } from './create/types';

/**
 * Client for managing subscription plan templates.
 *
 * Plans define billing rules (frequency, amount, trial) that are shared
 * across many individual subscriptions. The `init_point` URL lets
 * buyers subscribe to a plan directly.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PreApprovalPlan {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new subscription plan template.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/create.ts Usage Example }.
	 */
	create({ body, requestOptions }: PreApprovalPlanCreateData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve an existing subscription plan by its unique identifier.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/get.ts Usage Example }.
	 */
	get({ preApprovalPlanId, requestOptions }: PreApprovalPlanGetData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id: preApprovalPlanId, config: this.config });
	}

	/**
	 * Update an existing subscription plan (e.g. change amount, status, or allowed payment methods).
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/update.ts Usage Example }.
	 */
	update({ id, updatePreApprovalPlanRequest, requestOptions }: UpdatePreApprovalPlanUpdateData): Promise<PreApprovalPlanResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, updatePreApprovalPlanRequest, config: this.config });
	}

	/**
	 * Search subscription plans using filters such as status or free-text query.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/preapprovalplan/search.ts Usage Example }.
	 */
	search(preApprovalPlanSearchData: PreApprovalPlanSearchData = {}): Promise<PreApprovalPlanSearchResponse> {
		const { options, requestOptions } = preApprovalPlanSearchData;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

}
