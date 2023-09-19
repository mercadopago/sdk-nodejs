import create from './create';
import get from './get';

import { PreApprovalRequest, PreApprovalResponse } from './commonTypes';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

export class PreApproval {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/create/create.ts Usage Example  }.
   */
	create(body: PreApprovalRequest): Promise<PreApprovalResponse> {
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/preapprovalplans/get/get.ts Usage Example  }.
   */
	get({ id }): Promise<PreApprovalResponse> {
		return get({ id, config: this.config });
	}
}
