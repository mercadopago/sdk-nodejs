import get from './get';
import create from './create';
import list from './list';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentsRefundsCreateData } from './create/types';
import type { PaymentsRefundsGetData } from './get/types';
import type { PaymentsRefundsListData } from './list/types';
import type { RefundResponse } from './commonTypes';

/**
 * Mercado Pago Refund.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PaymentsRefunds {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Get Refund.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefunds/get.ts Usage Example  }.
   */
	get({ payment_id, refund_id, requestOptions }: PaymentsRefundsGetData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ payment_id, refund_id, config: this.config });
	}

	/**
   * Mercado Pago Create Refund.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefunds/create.ts Usage Example  }.
   */
	create({ payment_id, body, requestOptions }: PaymentsRefundsCreateData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ payment_id, body, config: this.config });
	}

	/**
   * Mercado Pago Get Refund List.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefunds/list.ts Usage Example  }.
   */
	list({ payment_id, requestOptions }: PaymentsRefundsListData): Promise<Array<RefundResponse>> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ payment_id, config: this.config });
	}

}
