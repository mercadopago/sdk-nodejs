import cancelPaymentIntent from './cancelPaymentIntent';
import changeDeviceOperatingMode from './changeDeviceOperatingMode';
import createPaymentIntent from './createPaymentIntent';
import getDevices from './getDevices';
import getPaymentIntentList from './getPaymentIntentList';
import getPaymentIntentStatus from './getPaymentIntentStatus';
import searchPaymentIntent from './searchPaymentIntent';

import { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import { ChangeDeviceOperatingModeRequest } from './changeDeviceOperatingMode/types';
import { CreatePaymentIntentRequest } from './createPaymentIntent/types';
import { GetDevicesRequest } from './getDevices/types';
import { GetPaymentIntentListRequest } from './getPaymentIntentList/types';

import {
	CancelPaymentIntentResponse,
	ChangeDeviceOperatingModeResponse,
	GetDevicesResponse,
	GetPaymentIntentListResponse,
	PaymentIntentResponse,
	PaymentIntentStatusResponse,
} from './commonTypes';
import type { Options } from '@src/types';

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
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api_paymentintent_mlb/_point_integration-api_devices_deviceid_payment-intents/post Usage Example }.
   */
	createPaymentIntent({
		device_id,
		request,
	}: CreatePaymentIntentRequest, requestOptions?: Options): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return createPaymentIntent({ device_id, request, config: this.config });
	}

	/**
   * Mercado Pago Search Payment Intent.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_payment-intents_paymentintentid/get Usage Example }.
   */
	searchPaymentIntent(
		payment_intent_id: string
		, requestOptions?: Options): Promise<PaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return searchPaymentIntent({
			payment_intent_id: payment_intent_id,
			config: this.config,
		});
	}

	/**
   * Mercado Pago Cancel Payment Intent.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_deviceid_payment-intents_paymentintentid/delete Usage Example }.
   */
	cancelPaymentIntent(
		device_id: string,
		payment_intent_id: string
		, requestOptions?: Options): Promise<CancelPaymentIntentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancelPaymentIntent({
			device_id,
			payment_intent_id,
			config: this.config,
		});
	}

	/**
   * Mercado Pago Get Payment Intent List.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_deviceid_payment-intents_paymentintentid/delete Usage Example }.
   */
	getPaymentIntentList(
		request?: GetPaymentIntentListRequest
		, requestOptions?: Options): Promise<GetPaymentIntentListResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentList({
			filters: request?.filters,
			config: this.config,
		});
	}

	/**
   * Mercado Pago Get Payment Intent Status.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_payment-intents_paymentintentid_events/get Usage Example }.
   */
	getPaymentIntentStatus(
		payment_intent_id: string
		, requestOptions?: Options): Promise<PaymentIntentStatusResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getPaymentIntentStatus({ payment_intent_id, config: this.config });
	}

	/**
   * Mercado Pago Get Devices.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices/get Usage Example }.
   */
	getDevices(request: GetDevicesRequest, requestOptions?: Options): Promise<GetDevicesResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return getDevices({ filters: request?.filters, config: this.config });
	}

	/**
   * Mercado Pago Change Device Operating Mode.
   *
   * @see {@link https://www.mercadopago.com.br/developers/en/reference/integrations_api/_point_integration-api_devices_device-id/patch Usage Example }.
   */
	changeDeviceOperatingMode({
		device_id,
		request,
	}: ChangeDeviceOperatingModeRequest, requestOptions?: Options): Promise<ChangeDeviceOperatingModeResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return changeDeviceOperatingMode({
			device_id,
			request,
			config: this.config,
		});
	}
}
