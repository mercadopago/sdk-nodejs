import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreApprovalPlanId } from './get/types';
import type { UpdatePreApprovalPlanRequest } from './update/types';
import type { PreApprovalPlanSearchOptions, PreApprovalPlanSearchResponse } from './search/types';
import type { PreApprovalPlanRequest, PreApprovalPlanResponse } from './commonTypes';

/**
 * Mercado Pago PreApprovalPlan.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PreApprovalPlan {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/create/create.ts Usage Example  }.
   */
	create(preApprovalPlanRequest: PreApprovalPlanRequest): Promise<PreApprovalPlanResponse> {
		return create({ preApprovalPlanRequest, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/get/get.ts Usage Example  }.
   */
	get({ preApprovalPlanId }: PreApprovalPlanId): Promise<PreApprovalPlanResponse> {
		return get({ id: preApprovalPlanId, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/update/update.ts Usage Example  }.
   */
	update({ id, updatePreApprovalPlanRequest }: UpdatePreApprovalPlanRequest): Promise<PreApprovalPlanResponse> {
		return update({ id, updatePreApprovalPlanRequest, config: this.config });
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/search/search.ts Usage Example  }.
   */
	search(filters?: PreApprovalPlanSearchOptions): Promise<PreApprovalPlanSearchResponse> {
		return search({ filters, config: this.config });
	}

}
