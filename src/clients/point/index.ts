import cancelPaymentIntent from './cancelPaymentIntent';
import changeDeviceOperatingMode from './changeDeviceOperatingMode';
import createPaymentIntent from './createPaymentIntent';
import getDevices from './getDevices';
import getPaymentIntentList from './getPaymentIntentList';
import getPaymentIntentStatus from './getPaymentIntentStatus';
import searchPaymentIntent from './searchPaymentIntent';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

import type { PointChangeDeviceOperatingModeData } from './changeDeviceOperatingMode/types';
import type { PointCreatePaymentIntentData } from './createPaymentIntent/types';
import type { PointGetDevicesData } from './getDevices/types';
import type { PointGetPaymentIntentListData } from './getPaymentIntentList/types';
import type { PointSearchPaymentIntentData } from './searchPaymentIntent/types';
import type { PointCancelPaymentIntentData } from './cancelPaymentIntent/types';
import type { PointGetPaymentIntentStatusData } from './getPaymentIntentStatus/types';
import type {
	CancelPaymentIntentResponse,
	ChangeDeviceOperatingModeResponse,
	GetDevicesResponse,
	GetPaymentIntentListResponse,
	PaymentIntentResponse,
	PaymentIntentStatusResponse,
} from './commonTypes';

/**
 * Mercado Pago Point.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Point {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Create Payment Intent.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/createPaymentIntent.ts Usage Example }.
   */
	createPaymentIntent({ device_id, request, requestOptions }: PointCreatePaymentIntentData): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPaymentIntent({ device_id, request, config: this.config });
	}

	/**
   * Mercado Pago Search Payment Intent.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/searchPaymentIntent.ts Usage Example }.
   */
	searchPaymentIntent({ payment_intent_id, requestOptions }: PointSearchPaymentIntentData): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return searchPaymentIntent({ payment_intent_id: payment_intent_id,config: this.config });
	}

	/**
   * Mercado Pago Cancel Payment Intent.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/cancelPaymentIntent.ts Usage Example }.
   */
	cancelPaymentIntent({ device_id, payment_intent_id, requestOptions }: PointCancelPaymentIntentData): Promise<CancelPaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancelPaymentIntent({ device_id,payment_intent_id,config: this.config });
	}

	/**
   * Mercado Pago Get Payment Intent List.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentList.ts Usage Example }.
   */
	getPaymentIntentList(pointGetPaymentIntentListOptions: PointGetPaymentIntentListData = {}): Promise<GetPaymentIntentListResponse> {
		const { body, requestOptions } = pointGetPaymentIntentListOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentList({ options: body?.options,config: this.config });
	}

	/**
   * Mercado Pago Get Payment Intent Status.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentStatus.ts Usage Example }.
   */
	getPaymentIntentStatus({ payment_intent_id, requestOptions }: PointGetPaymentIntentStatusData): Promise<PaymentIntentStatusResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentStatus({ payment_intent_id, config: this.config });
	}

	/**
   * Mercado Pago Get Devices.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getDevices.ts Usage Example }.
   */
	getDevices({ request, requestOptions }: PointGetDevicesData): Promise<GetDevicesResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getDevices({ options: request?.options, config: this.config });
	}

	/**
   * Mercado Pago Change Device Operating Mode.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/changeDeviceOperatingMode.ts Usage Example }.
   */
	changeDeviceOperatingMode({ device_id, request, requestOptions }: PointChangeDeviceOperatingModeData): Promise<ChangeDeviceOperatingModeResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return changeDeviceOperatingMode({ device_id, request ,config: this.config });
	}
}
