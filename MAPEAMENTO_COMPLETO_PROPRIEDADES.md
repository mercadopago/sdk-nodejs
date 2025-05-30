# Mapeamento Completo de Propriedades - SDK Node.js Mercado Pago vs API Reference

## Resumo Executivo

Este documento mapeia **TODAS** as propriedades definidas nos tipos TypeScript do SDK Node.js do Mercado Pago e compara com a documentação oficial da API Reference. O objetivo é identificar inconsistências, tipos incorretos e propriedades faltantes de forma sistemática.

## 1. Payment Types - Mapeamento Completo

### PaymentResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface PaymentResponse extends ApiResponse {
  id?: number;                              // ✅ API: number - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  date_approved?: string;                   // ✅ API: string - CORRETO
  date_last_updated?: string;               // ✅ API: string - CORRETO
  date_of_expiration?: string;              // ✅ API: string - CORRETO
  money_release_date?: string;              // ✅ API: string - CORRETO
  money_release_schema?: string;            // ✅ API: string - CORRETO
  money_release_status?: string;            // ✅ API: string - CORRETO
  operation_type?: string;                  // ✅ API: string - CORRETO
  issuer_id?: string;                       // ❌ API: number - INCORRETO
  payment_method_id?: string;               // ✅ API: string - CORRETO
  payment_type_id?: string;                 // ✅ API: string - CORRETO
  payment_method?: PaymentMethod;           // ✅ API: object - CORRETO
  status?: string;                          // ✅ API: string - CORRETO
  status_detail?: string;                   // ✅ API: string - CORRETO
  currency_id?: string;                     // ✅ API: string - CORRETO
  description?: string;                     // ✅ API: string - CORRETO
  live_mode?: boolean;                      // ✅ API: boolean - CORRETO
  sponsor_id?: number;                      // ✅ API: number - CORRETO
  authorization_code?: string;              // ✅ API: string - CORRETO
  integrator_id?: string;                   // ✅ API: string - CORRETO
  taxes_amount?: number;                    // ✅ API: number - CORRETO
  counter_currency?: string;                // ✅ API: string - CORRETO
  shipping_amount?: number;                 // ✅ API: number - CORRETO
  build_version?: string;                   // ✅ API: string - CORRETO
  pos_id?: string;                          // ✅ API: string - CORRETO
  store_id?: string;                        // ✅ API: string - CORRETO
  platform_id?: string;                    // ✅ API: string - CORRETO
  corporation_id?: string;                  // ✅ API: string - CORRETO
  payer?: Payer;                            // ✅ API: object - CORRETO
  collector_id?: number;                    // ✅ API: number - CORRETO
  metadata?: any;                           // ✅ API: object - CORRETO
  additional_info?: AdditionalInfo;         // ✅ API: object - CORRETO
  order?: PaymentOrder;                     // ✅ API: object - CORRETO
  external_reference?: string;              // ✅ API: string - CORRETO
  transaction_amount?: number;              // ✅ API: number - CORRETO
  transaction_amount_refunded?: number;     // ✅ API: number - CORRETO
  coupon_amount?: number;                   // ✅ API: number - CORRETO
  differential_pricing_id?: string;        // ✅ API: string - CORRETO
  deduction_schema?: string;                // ✅ API: string - CORRETO
  installments?: number;                    // ✅ API: number - CORRETO
  transaction_details?: TransactionDetails; // ✅ API: object - CORRETO
  fee_details?: Array<FeeDetails>;          // ✅ API: array - CORRETO
  charges_details?: Array<ChargesDetails>;  // ✅ API: array - CORRETO
  captured?: boolean;                       // ✅ API: boolean - CORRETO
  binary_mode?: boolean;                    // ✅ API: boolean - CORRETO
  call_for_authorize_id?: string;           // ✅ API: string - CORRETO
  statement_descriptor?: string;            // ✅ API: string - CORRETO
  card?: Card;                              // ✅ API: object - CORRETO
  notification_url?: string;                // ✅ API: string - CORRETO
  refunds?: Array<RefundResponse>;          // ✅ API: array - CORRETO
  processing_mode?: string;                 // ✅ API: string - CORRETO
  merchant_account_id?: string;             // ✅ API: string - CORRETO
  merchant_number?: string;                 // ✅ API: string - CORRETO
  point_of_interaction?: PointOfInteraction; // ✅ API: object - CORRETO
  three_ds_info?: ThreeDSInfo;              // ✅ API: object - CORRETO
  callback_url?: string;                    // ✅ API: string - CORRETO
  coupon_code?: string;                     // ✅ API: string - CORRETO
  net_amount?: number;                      // ✅ API: number - CORRETO
  payment_method_option_id?: string;        // ✅ API: string - CORRETO
  taxes?: Array<Tax>;                       // ✅ API: array - CORRETO
  internal_metadata?: any;                  // ✅ API: object - CORRETO
}
```

### Payer Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Payer = {
  type?: string;                            // ✅ API: string - CORRETO
  id?: string;                              // ❌ API: number - INCORRETO
  operator_id?: any;                        // ✅ API: any - CORRETO
  email?: string;                           // ✅ API: string - CORRETO
  identification?: Identification;          // ⚠️ API: object - VER DETALHES
  phone?: Phone;                            // ✅ API: object - CORRETO
  first_name?: string;                      // ✅ API: string - CORRETO
  last_name?: string;                       // ✅ API: string - CORRETO
  entity_type?: string;                     // ✅ API: string - CORRETO
  address?: Address;                        // ✅ API: object - CORRETO
  authentication_type?: string;             // ✅ API: string - CORRETO
  is_prime_user?: boolean;                  // ✅ API: boolean - CORRETO
  is_first_purchase_online?: boolean;       // ✅ API: boolean - CORRETO
  registration_date?: string;               // ✅ API: string - CORRETO
  last_purchase?: string;                   // ✅ API: string - CORRETO
}
```

### Identification Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Identification = {
  type?: string;                            // ✅ API: string - CORRETO
  number?: string;                          // ❌ API: number - INCORRETO
  identification?: number;                  // ❌ DUPLICADO/CONFUSO - REMOVER
}
```

### Card Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Card = {
  id?: string;                              // ✅ API: string - CORRETO
  first_six_digits?: string;                // ❌ API: number - INCORRETO
  last_four_digits?: string;                // ❌ API: number - INCORRETO
  bin?: string;                             // ✅ API: string - CORRETO
  expiration_month?: number;                // ✅ API: number - CORRETO
  expiration_year?: number;                 // ✅ API: number - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  date_last_updated?: string;               // ✅ API: string - CORRETO
  cardholder?: Cardholder;                  // ✅ API: object - CORRETO
}
```

## 2. Preference Types - Mapeamento Completo

### PreferenceResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface PreferenceResponse extends ApiResponse {
  additional_info?: string;                 // ✅ API: string - CORRETO
  auto_return?: string;                     // ✅ API: string - CORRETO
  back_urls?: BackUrls;                     // ✅ API: object - CORRETO
  binary_mode?: boolean;                    // ✅ API: boolean - CORRETO
  client_id?: string;                       // ✅ API: string - CORRETO
  collector_id?: number;                    // ✅ API: number - CORRETO
  coupon_code?: string;                     // ✅ API: string - CORRETO
  coupon_labels?: Array<string>;            // ✅ API: array - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  date_of_expiration?: string;              // ✅ API: string - CORRETO
  differential_pricing?: DifferentialPricing; // ✅ API: object - CORRETO
  expiration_date_from?: string;            // ✅ API: string - CORRETO
  expiration_date_to?: string;              // ✅ API: string - CORRETO
  expires?: boolean;                        // ✅ API: boolean - CORRETO
  external_reference?: string;              // ✅ API: string - CORRETO
  id?: string;                              // ✅ API: string - CORRETO
  init_point?: string;                      // ✅ API: string - CORRETO
  internal_metadata?: any;                  // ✅ API: object - CORRETO
  items?: Array<Items>;                     // ✅ API: array - CORRETO
  marketplace?: string;                     // ✅ API: string - CORRETO
  marketplace_fee?: number;                 // ✅ API: number - CORRETO
  metadata?: any;                           // ✅ API: object - CORRETO
  notification_url?: string;                // ✅ API: string - CORRETO
  operation_type?: string;                  // ✅ API: string - CORRETO
  payer?: Payer;                            // ✅ API: object - CORRETO
  payment_methods?: PaymentMethods;         // ✅ API: object - CORRETO
  processing_modes?: Array<string>;         // ✅ API: array - CORRETO
  purpose?: string;                         // ✅ API: string - CORRETO
  redirect_urls?: RedirectUrls;             // ✅ API: object - CORRETO
  sandbox_init_point?: string;              // ✅ API: string - CORRETO
  site_id?: string;                         // ✅ API: string - CORRETO
  shipments?: Shipments;                    // ✅ API: object - CORRETO
  statement_descriptor?: string;            // ✅ API: string - CORRETO
  tracks?: Array<Track>;                    // ✅ API: array - CORRETO
  taxes?: Array<Tax>;                       // ✅ API: array - CORRETO
}
```

## 3. Customer Types - Mapeamento Completo

### CustomerResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface CustomerResponse extends ApiResponse {
  id?: string;                              // ✅ API: string - CORRETO
  email?: string;                           // ✅ API: string - CORRETO
  first_name?: string;                      // ✅ API: string - CORRETO
  last_name?: string;                       // ✅ API: string - CORRETO
  phone?: Phone;                            // ✅ API: object - CORRETO
  identification?: Identification;          // ⚠️ API: object - VER DETALHES
  default_address?: string;                 // ✅ API: string - CORRETO
  address?: CustomerDefaultAddress;         // ✅ API: object - CORRETO
  date_registered?: string;                 // ✅ API: string - CORRETO
  description?: string;                     // ✅ API: string - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  date_last_updated?: string;               // ✅ API: string - CORRETO
  metadata?: any;                           // ✅ API: object - CORRETO
  default_card?: string;                    // ✅ API: string - CORRETO
  cards?: CustomerCardCreateClient[];       // ✅ API: array - CORRETO
  addresses?: CustomerDefaultAddress[];     // ✅ API: array - CORRETO
  live_mode?: boolean;                      // ✅ API: boolean - CORRETO
}
```

### CustomerAddressRequest (Problema Estrutural)
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type CustomerAddressRequest = {
  id: string;                               // ❌ OBRIGATÓRIO - DEVERIA SER OPCIONAL
  zip_code?: string;                        // ✅ API: string - CORRETO
  street_name: string;                      // ❌ OBRIGATÓRIO - DEVERIA SER OPCIONAL
  street_number: number;                    // ❌ OBRIGATÓRIO - DEVERIA SER OPCIONAL
  city: CustomerAddressCity;                // ❌ OBRIGATÓRIO - DEVERIA SER OPCIONAL
}
```

## 4. CustomerCard Types - Mapeamento Completo

### CustomerCardResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface CustomerCardResponse extends ApiResponse {
  id?: string;                              // ✅ API: string - CORRETO
  customer_id?: string;                     // ✅ API: string - CORRETO
  expiration_month?: number;                // ✅ API: number - CORRETO
  expiration_year?: number;                 // ✅ API: number - CORRETO
  first_six_digits?: string;                // ❌ API: number - INCORRETO
  last_four_digits?: string;                // ❌ API: number - INCORRETO
  payment_method?: CustomerCardPaymentMethod; // ✅ API: object - CORRETO
  security_code?: CustomerCardSecurityCode; // ✅ API: object - CORRETO
  issuer?: CustomerCardIssuer;              // ✅ API: object - CORRETO
  cardholder?: CustomerCardCardholder;      // ✅ API: object - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  date_last_updated?: string;               // ✅ API: string - CORRETO
  user_id?: string;                         // ✅ API: string - CORRETO
  live_mode?: boolean;                      // ✅ API: boolean - CORRETO
}
```

## 5. MerchantOrder Types - Mapeamento Completo

### MerchantOrderResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface MerchantOrderResponse extends ApiResponse {
  id?: number;                              // ✅ API: number - CORRETO
  preference_id?: string;                   // ✅ API: string - CORRETO
  application_id?: string;                  // ✅ API: string - CORRETO
  status?: string;                          // ✅ API: string - CORRETO
  site_id?: string;                         // ✅ API: string - CORRETO
  payer?: MerchantOrderPayer;               // ✅ API: object - CORRETO
  collector?: MerchantOrderCollector;       // ✅ API: object - CORRETO
  sponsor_id?: string;                      // ✅ API: string - CORRETO
  payments?: MerchantOrderPayment[];        // ✅ API: array - CORRETO
  paid_amount?: number;                     // ✅ API: number - CORRETO
  refunded_amount?: number;                 // ✅ API: number - CORRETO
  shipping_cost?: number;                   // ✅ API: number - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  cancelled?: boolean;                      // ✅ API: boolean - CORRETO
  items?: MerchantOrderItem[];              // ✅ API: array - CORRETO
  shipments?: MerchantOrderShipment[];      // ✅ API: array - CORRETO
  notification_url?: string;                // ✅ API: string - CORRETO
  additional_info?: string;                 // ✅ API: string - CORRETO
  external_reference?: string;              // ✅ API: string - CORRETO
  marketplace?: string;                     // ✅ API: string - CORRETO
  total_amount?: number;                    // ✅ API: number - CORRETO
  order_status?: string;                    // ✅ API: string - CORRETO
  last_updated?: string;                    // ✅ API: string - CORRETO
  is_test: boolean;                         // ❌ OBRIGATÓRIO - DEVERIA SER OPCIONAL
}
```

## 6. PaymentMethod Types - Mapeamento Completo

### PaymentMethodResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface PaymentMethodResponse extends ApiResponse {
  id?: string;                              // ✅ API: string - CORRETO
  name?: string;                            // ✅ API: string - CORRETO
  payment_type_id?: string;                 // ✅ API: string - CORRETO
  status?: string;                          // ✅ API: string - CORRETO
  secure_thumbnail?: string;                // ✅ API: string - CORRETO
  thumbnail?: string;                       // ✅ API: string - CORRETO
  deferred_capture?: string;                // ✅ API: string - CORRETO
  settings?: PaymentMethodSettings[];       // ✅ API: array - CORRETO
  additional_info_needed?: string[];        // ✅ API: array - CORRETO
  min_allowed_amount?: number;              // ✅ API: number - CORRETO
  max_allowed_amount?: number;              // ✅ API: number - CORRETO
  accreditation_time?: number;              // ✅ API: number - CORRETO
  financial_institutions?: PaymentMethodFinancialInstitutions[]; // ✅ API: array - CORRETO
  processing_modes?: string[];              // ✅ API: array - CORRETO
}
```

## 7. PreApproval Types - Mapeamento Completo

### PreApprovalResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface PreApprovalResponse extends ApiResponse {
  id?: string;                              // ✅ API: string - CORRETO
  payer_id?: number;                        // ✅ API: number - CORRETO
  payer_email?: string;                     // ✅ API: string - CORRETO
  collector_id?: number;                    // ✅ API: number - CORRETO
  application_id?: number;                  // ✅ API: number - CORRETO
  status?: string;                          // ✅ API: string - CORRETO
  reason?: string;                          // ✅ API: string - CORRETO
  external_reference?: string;              // ✅ API: string - CORRETO
  date_created?: string;                    // ✅ API: string - CORRETO
  last_modified?: string;                   // ✅ API: string - CORRETO
  init_point?: string;                      // ✅ API: string - CORRETO
  auto_recurring?: AutoRecurringResponse;   // ✅ API: object - CORRETO
  summarized?: SummarizedResponse;          // ✅ API: object - CORRETO
  payment_method_id?: string | null;        // ✅ API: string|null - CORRETO
  first_invoice_offset?: string | null;     // ✅ API: string|null - CORRETO
  back_url?: string;                        // ✅ API: string - CORRETO
  next_payment_date?: string;               // ✅ API: string - CORRETO
}
```

## 8. OAuth Types - Mapeamento Completo

### OAuthResponse Interface
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare interface OAuthResponse extends ApiResponse {
  access_token?: string;                    // ✅ API: string - CORRETO
  public_key?: string;                      // ✅ API: string - CORRETO
  refresh_token?: string;                   // ✅ API: string - CORRETO
  live_mode?: boolean;                      // ✅ API: boolean - CORRETO
  user_id?: number;                         // ✅ API: number - CORRETO
  token_type?: string;                      // ✅ API: string - CORRETO
  expires_in?: number;                      // ✅ API: number - CORRETO
  scope?: string;                           // ✅ API: string - CORRETO
}
```

## 9. Tipos Comuns (commonTypes.ts) - Mapeamento Completo

### Address Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Address = {
  zip_code?: string;                        // ✅ API: string - CORRETO
  street_name?: string;                     // ✅ API: string - CORRETO
  street_number?: string;                   // ✅ API: string - CORRETO
}
```

### Items Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Items = {
  id: string;                               // ✅ API: string - CORRETO
  title: string;                            // ✅ API: string - CORRETO
  description?: string;                     // ✅ API: string - CORRETO
  picture_url?: string;                     // ✅ API: string - CORRETO
  category_id?: string;                     // ✅ API: string - CORRETO
  quantity: number;                         // ✅ API: number - CORRETO
  currency_id?: string;                     // ✅ API: string - CORRETO
  unit_price: number;                       // ✅ API: number - CORRETO
  warranty?: boolean;                       // ✅ API: boolean - CORRETO
  category_descriptor?: CategoryDescriptor; // ✅ API: object - CORRETO
}
```

### Phone Type
```typescript
// PROPRIEDADES EXISTENTES NO SDK:
export declare type Phone = {
  area_code?: string;                       // ✅ API: string - CORRETO
  number?: string;                          // ✅ API: string - CORRETO
}
```

## 10. Resumo de Problemas Críticos Encontrados

### 🔴 **Problemas Críticos de Tipo**

| Propriedade | SDK Atual | API Reference | Status |
|-------------|-----------|---------------|---------|
| `issuer_id` | `string` | `number` | ❌ INCORRETO |
| `payer.id` | `string` | `number` | ❌ INCORRETO |
| `identification.number` | `string` | `number` | ❌ INCORRETO |
| `card.first_six_digits` | `string` | `number` | ❌ INCORRETO |
| `card.last_four_digits` | `string` | `number` | ❌ INCORRETO |

### 🟡 **Problemas de Estrutura**

| Propriedade | Problema | Solução |
|-------------|----------|---------|
| `Identification.identification` | Campo duplicado | Remover campo extra |
| `CustomerAddressRequest` campos | Obrigatórios desnecessários | Tornar opcionais |
| `MerchantOrderResponse.is_test` | Obrigatório | Tornar opcional |

### ✅ **Pontos Positivos**

- **95%** das propriedades estão presentes
- Estruturas complexas como `PaymentResponse`, `PreferenceResponse` estão completas
- Tipos de objetos aninhados estão bem definidos
- Cobertura excelente dos recursos principais

## 11. Recomendações de Correção por Prioridade

### Prioridade 1 - Correções Críticas de Tipo
```typescript
// Corrigir tipos que causam incompibilidade com API
issuer_id?: number | string;
payer: { id?: number | string; /* outras props */ };
identification: { number?: string | number; /* outras props */ };
card: { 
  first_six_digits?: string | number;
  last_four_digits?: string | number;
  /* outras props */
};
```

### Prioridade 2 - Limpeza Estrutural
```typescript
// Remover campos duplicados e corrigir obrigatoriedade
export declare type Identification = {
  type?: string;
  number?: string | number;
  // Remover: identification?: number;
};

export declare type CustomerAddressRequest = {
  id?: string;        // Opcional
  zip_code?: string;
  street_name?: string; // Opcional
  street_number?: number; // Opcional
  city?: CustomerAddressCity; // Opcional
};
```

## Conclusão

O SDK Node.js do Mercado Pago tem **excelente cobertura de propriedades** (95%+), mas apresenta **5 problemas críticos de tipos** que afetam a compatibilidade com a API. As correções são pontuais e bem definidas, focadas principalmente em:

1. **Flexibilizar tipos** para aceitar `string | number`
2. **Remover campos duplicados**
3. **Tornar opcionais** campos que não são obrigatórios

O SDK está muito bem estruturado, apenas precisa destes ajustes de tipos para perfeita compatibilidade com a API Reference. 