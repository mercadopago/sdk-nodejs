import capture from './capture';
import search from './search';
import cancel from './cancel';
import create from './create';
import get from './get';

import type { AdvancedPaymentResponse } from './commonTypes';
import type { AdvancedPaymentSearchData, AdvancedPaymentSearch } from './search/types';
import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { AdvancedPaymentCreateData } from './create/types';
import type { AdvancedPaymentCaptureData } from './capture/types';
import type { AdvancedPaymentCancelData } from './cancel/types';
import type { AdvancedPaymentGetData } from './get/types';

/**
 * Mercado Pago Advanced Payment.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class AdvancedPayment {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Advanced Payment Search.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/advancedPayment/search.ts Usage Example  }.
   */
	search(advancedPaymentSearchOptions: AdvancedPaymentSearchData = {}): Promise<AdvancedPaymentSearch> {
		const { options, requestOptions } = advancedPaymentSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
   * Mercado Pago Advanced Payment Cancel.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/advancedPayment/cancel.ts Usage Example  }.
   */
	cancel({ id, requestOptions }: AdvancedPaymentCancelData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config } );
	}

	/**
   * Mercado Pago Advanced Payment Capture.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/advancedPayment/capture.ts Usage Example  }.
   */
	capture({ id, requestOptions }: AdvancedPaymentCaptureData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
   * Mercado Pago Advanced Payment Create.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/advancedPayment/create.ts Usage Example  }.
   */
	create({ body, requestOptions }: AdvancedPaymentCreateData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
   * Mercado Pago Advanced Payment Get.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/advancedPayment/get.ts Usage Example  }.
   */
	get({ id, requestOptions }: AdvancedPaymentGetData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config } );
	}
} 