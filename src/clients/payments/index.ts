import capture from './capture';
import search from './search';
import cancel from './cancel';
import create from './create';
import get from './get';

import type { PaymentsResponse } from './commonTypes';
import type { PaymentsSearch, PaymentsSearchOptions } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentsCreateRequest } from './create/types';
import type { PaymentCaptureRequestBody } from './capture/types';
import type { PaymentCancelRequestBody } from './cancel/types';
import type { PaymentGetRequestBody } from './get/types';
import type { Options } from '@src/types';

/**
 * Mercado Pago Payment.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Payment {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payments/search.ts Usage Example  }.
   */
	search(filters?: PaymentsSearchOptions, requestOptions?: Options): Promise<PaymentsSearch> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ filters, config: this.config });
	}

	/**
   * Mercado Pago Cancel.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payments/cancel.ts Usage Example  }.
   */
	cancel({ id }: PaymentCancelRequestBody, requestOptions?: Options): Promise<PaymentsResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config } );
	}

	/**
   * Mercado Pago Capture.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payments/capture.ts Usage Example  }.
   */
	capture({ id, transaction_amount }: PaymentCaptureRequestBody, requestOptions?: Options): Promise<PaymentsResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, transaction_amount, config: this.config });
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payments/create.ts Usage Example  }.
   */
	create(body: PaymentsCreateRequest, requestOptions?: Options): Promise<PaymentsResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payments/get.ts Usage Example  }.
   */
	get({ id }: PaymentGetRequestBody, requestOptions?: Options): Promise<PaymentsResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config } );
	}

}
