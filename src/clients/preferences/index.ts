import get from './get';
import create from './create';
import update from './update';
import search from './search';

import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PreferenceId, GetPreferenceResponse } from './get/types';
import type { PreferenceRequest, CreatePreferenceResponse } from './create/types';
import type { UpdatePreferenceNovo, UpdatePreferenceResponse } from './update/types';
import type { PreferenceSearchOptions, PreferenceSearchResponse } from './search/types';

export class Preference {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}
	get({ preferenceId }: PreferenceId): Promise<GetPreferenceResponse> {
		return get({ id: preferenceId, config: this.config});
	}

  create(preferenceRequest: PreferenceRequest): Promise<CreatePreferenceResponse> {
    return create({ preferenceRequest, config: this.config });
  }

  update({ id, updatePreferenceRequest}: UpdatePreferenceNovo): Promise<UpdatePreferenceResponse> {
    return update({ id, updatePreferenceRequest, config: this.config });
  }
	search(filters?: PreferenceSearchOptions): Promise<PreferenceSearchResponse> {
		return search({filters, config: this.config});
	}

}
