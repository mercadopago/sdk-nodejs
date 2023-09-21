import get from './get';
import create from './create';
import list from './list';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { CreateRefund } from './create/types';
import type { GetRefund } from './get/types';
import type { GetRefundList } from './list/types';
import type { RefundResponse } from './commonTypes';
import type { Options } from '@src/types';

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
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/paymentRefunds/get/get.ts Usage Example  }.
   */
	get({ payment_id, refund_id }: GetRefund, requestOptions?: Options): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ payment_id, refund_id, config: this.config });
	}

	/**
   * Mercado Pago Create Refund.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/paymentRefunds/create/create.ts Usage Example  }.
   */
	create({ payment_id, body }: CreateRefund, requestOptions?: Options): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ payment_id, body, config: this.config });
	}

	/**
   * Mercado Pago Get Refund List.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/paymentRefunds/list/list.ts Usage Example  }.
   */
	list({ payment_id }: GetRefundList, requestOptions?: Options): Promise<Array<RefundResponse>> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ payment_id, config: this.config });
	}

}
