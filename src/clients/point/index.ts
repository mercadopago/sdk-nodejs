/**
 * Point (Smart POS) client for the MercadoPago API.
 *
 * Provides methods to manage payment intents on Point terminals and to
 * administer the registered Point devices (list, change operating mode).
 *
 * @module point
 */

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
 * Client facade for MercadoPago Point Integration API operations.
 *
 * Use this class to create, search, cancel, and list payment intents on
 * Point Smart POS terminals, as well as to query and configure the
 * registered devices.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class Point {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new payment intent on a specific Point device.
	 *
	 * The intent is sent to the terminal, which will prompt the buyer to
	 * present a card or other payment method.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/createPaymentIntent.ts Usage Example }.
	 */
	createPaymentIntent({ device_id, request, requestOptions }: PointCreatePaymentIntentData): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPaymentIntent({ device_id, request, config: this.config });
	}

	/**
	 * Retrieve the details of an existing payment intent by its ID.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/searchPaymentIntent.ts Usage Example }.
	 */
	searchPaymentIntent({ payment_intent_id, requestOptions }: PointSearchPaymentIntentData): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return searchPaymentIntent({ payment_intent_id: payment_intent_id,config: this.config });
	}

	/**
	 * Cancel a pending payment intent on a specific Point device.
	 *
	 * Only intents that have not yet been completed can be cancelled.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/cancelPaymentIntent.ts Usage Example }.
	 */
	cancelPaymentIntent({ device_id, payment_intent_id, requestOptions }: PointCancelPaymentIntentData): Promise<CancelPaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancelPaymentIntent({ device_id,payment_intent_id,config: this.config });
	}

	/**
	 * List payment intent events, optionally filtered by date range.
	 *
	 * Returns the lifecycle events (creation, completion, cancellation) for
	 * all payment intents associated with the authenticated account.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentList.ts Usage Example }.
	 */
	getPaymentIntentList(pointGetPaymentIntentListOptions: PointGetPaymentIntentListData = {}): Promise<GetPaymentIntentListResponse> {
		const { body, requestOptions } = pointGetPaymentIntentListOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentList({ options: body?.options,config: this.config });
	}

	/**
	 * Get the latest status event for a specific payment intent.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getPaymentIntentStatus.ts Usage Example }.
	 */
	getPaymentIntentStatus({ payment_intent_id, requestOptions }: PointGetPaymentIntentStatusData): Promise<PaymentIntentStatusResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentStatus({ payment_intent_id, config: this.config });
	}

	/**
	 * List Point devices registered to the authenticated account.
	 *
	 * Results can be filtered by store and POS identifiers.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/getDevices.ts Usage Example }.
	 */
	getDevices({ request, requestOptions }: PointGetDevicesData): Promise<GetDevicesResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getDevices({ options: request?.options, config: this.config });
	}

	/**
	 * Change the operating mode of a Point device (e.g. `PDV` or `STANDALONE`).
	 *
	 * In `PDV` mode the device receives payment intents from the integration;
	 * in `STANDALONE` mode the seller operates the device manually.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/point/changeDeviceOperatingMode.ts Usage Example }.
	 */
	changeDeviceOperatingMode({ device_id, request, requestOptions }: PointChangeDeviceOperatingModeData): Promise<ChangeDeviceOperatingModeResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return changeDeviceOperatingMode({ device_id, request ,config: this.config });
	}
}
