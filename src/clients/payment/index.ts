import capture from './capture';
import search from './search';
import cancel from './cancel';
import create from './create';
import get from './get';
import update from './update';

import type { PaymentResponse } from './commonTypes';
import type { PaymentSearchData, PaymentSearch, PaymentSearchAuthorizedData } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentCreateData } from './create/types';
import type { PaymentCaptureData } from './capture/types';
import type { PaymentCancelData } from './cancel/types';
import type { PaymentGetData } from './get/types';
import type { PaymentUpdateData } from './update/types';

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
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/search.ts Usage Example  }.
   */
	search(paymentSearchOptions: PaymentSearchData = {}): Promise<PaymentSearch> {
		const { options, requestOptions } = paymentSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
   * Mercado Pago Search Authorized Payments.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/searchAuthorized.ts Usage Example  }.
   */
	searchAuthorized(paymentSearchOptions: PaymentSearchAuthorizedData = {}): Promise<PaymentSearch> {
		const { options, requestOptions } = paymentSearchOptions;
		const searchOptions = { ...options, status: 'authorized' as const };
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options: searchOptions, config: this.config });
	}

	/**
   * Mercado Pago Cancel.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/cancel.ts Usage Example  }.
   */
	cancel({ id, requestOptions }: PaymentCancelData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config } );
	}

	/**
   * Mercado Pago Capture.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/capture.ts Usage Example  }.
   */
	capture({ id, transaction_amount, requestOptions }: PaymentCaptureData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, transaction_amount, config: this.config });
	}

	/**
   * Mercado Pago Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/create.ts Usage Example  }.
   */
	create({ body, requestOptions }: PaymentCreateData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: PaymentGetData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config } );
	}

	/**
   * Mercado Pago Get Authorized Payment (alias for get with authorized filter).
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/getAuthorized.ts Usage Example  }.
   */
	getAuthorized({ id, requestOptions }: PaymentGetData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
   * Mercado Pago Update.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/payment/update.ts Usage Example  }.
   */
	update({ id, body, requestOptions }: PaymentUpdateData): Promise<PaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, body, config: this.config });
	}
}
