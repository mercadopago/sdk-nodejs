# Análise de Propriedades dos Tipos TypeScript - SDK Node.js Mercado Pago

## Resumo Executivo

Este documento apresenta uma análise detalhada das **propriedades dos tipos TypeScript** no SDK Node.js do Mercado Pago quando comparadas com os exemplos de resposta da API Reference oficial. O foco é exclusivamente nas propriedades faltantes, incorretas ou inconsistentes nos tipos existentes.

## 1. Payment Types - Propriedades Analisadas

### PaymentResponse Interface

Comparando o tipo `PaymentResponse` do SDK com exemplos da API:

#### ✅ **Propriedades Corretas e Presentes**
```typescript
// Propriedades que estão corretas no SDK
id?: number;                    // ✅ Correto
date_created?: string;          // ✅ Correto  
date_approved?: string;         // ✅ Correto
date_last_updated?: string;     // ✅ Correto
money_release_date?: string;    // ✅ Correto
payment_method_id?: string;     // ✅ Correto
payment_type_id?: string;       // ✅ Correto
status?: string;               // ✅ Correto
status_detail?: string;        // ✅ Correto
currency_id?: string;          // ✅ Correto
description?: string;          // ✅ Correto
collector_id?: number;         // ✅ Correto
external_reference?: string;   // ✅ Correto
transaction_amount?: number;   // ✅ Correto
transaction_amount_refunded?: number; // ✅ Correto
coupon_amount?: number;        // ✅ Correto
installments?: number;         // ✅ Correto
```

#### ⚠️ **Propriedades que Precisam Verificação de Tipo**

**1. `issuer_id` - Inconsistência de Tipo**
```typescript
// No SDK atual:
issuer_id?: string;

// Na API Reference aparece como:
issuer_id: 25  // Número!

// ❌ PROBLEMA: Tipo incorreto, deveria ser number
```

**2. `payer.identification.number` - Inconsistência de Tipo**
```typescript
// No SDK atual:
export declare type Identification = {
  type?: string;
  number?: string;  // ❌ String
  identification?: number; // ❌ Campo duplicado/confuso
};

// Na API Reference aparece como:
"identification": {
  "number": 19119119100,  // Número!
  "type": "CPF"
}

// ❌ PROBLEMA: number deveria ser number | string para suportar ambos
```

**3. `payer.id` - Inconsistência de Tipo**
```typescript
// No SDK atual:
id?: string;

// Na API Reference aparece como:
"payer": {
  "id": 123,  // Número!
  "email": "test_user_80507629@testuser.com"
}

// ❌ PROBLEMA: Tipo incorreto, deveria ser number | string
```

#### ❌ **Propriedades Faltantes**

Baseado nos exemplos da API Reference, as seguintes propriedades estão **faltando** no `PaymentResponse`:

```typescript
// Propriedades faltantes no PaymentResponse
issuer_id?: number;                    // ❌ Faltando (existe como string)
live_mode?: boolean;                   // ✅ Presente
sponsor_id?: number;                   // ✅ Presente  
authorization_code?: string;           // ✅ Presente
integrator_id?: string;               // ✅ Presente
taxes_amount?: number;                // ✅ Presente
shipping_amount?: number;             // ✅ Presente
pos_id?: string;                      // ✅ Presente
store_id?: string;                    // ✅ Presente
platform_id?: string;                // ✅ Presente
corporation_id?: string;              // ✅ Presente

// Campos de resposta que podem estar faltando:
statement_descriptor?: string;        // ✅ Presente
notification_url?: string;           // ✅ Presente
processing_mode?: string;            // ✅ Presente
```

## 2. TransactionDetails - Propriedades Analisadas

### Comparação com API Reference

```typescript
// No SDK atual:
export declare type TransactionDetails = {
  payment_method_reference_id?: string;
  acquirer_reference?: string;
  net_received_amount?: number;         // ✅ Correto
  total_paid_amount?: number;           // ✅ Correto  
  overpaid_amount?: number;             // ✅ Correto
  external_resource_url?: string;
  installment_amount?: number;          // ✅ Correto
  financial_institution?: string;
  payable_deferral_period?: any;
  transaction_id?: string;
  barcode?: Barcode;
  digitable_line?: string;
  verification_code?: string;
  bank_transfer_id?: string;
}

// ✅ Os tipos estão corretos conforme API Reference
```

## 3. Card Types - Propriedades Analisadas

### Card Interface

```typescript
// No SDK atual:
export declare type Card = {
  id?: string;
  first_six_digits?: string;           // ✅ Correto
  last_four_digits?: string;           // ✅ Correto
  bin?: string;
  expiration_month?: number;           // ✅ Correto
  expiration_year?: number;            // ✅ Correto
  date_created?: string;               // ✅ Correto
  date_last_updated?: string;          // ✅ Correto
  cardholder?: Cardholder;             // ✅ Correto
}

// ⚠️ Verificar se falta alguma propriedade baseada na API
```

**Inconsistência Encontrada:**
```typescript
// Na API Reference:
"first_six_digits": 423564,          // Número!
"last_four_digits": 5682,            // Número!

// No SDK:
first_six_digits?: string;           // ❌ String
last_four_digits?: string;           // ❌ String

// ❌ PROBLEMA: Deveriam ser number | string ou apenas number
```

## 4. PointOfInteraction - Propriedades Analisadas

### Verificação com PIX na API

```typescript
// No SDK atual:
export declare type PointOfInteraction = {
  type?: string;                       // ✅ Correto
  sub_type?: string;
  linked_to?: string;
  application_data?: ApplicationData;   // ✅ Correto
  transaction_data?: TransactionData;   // ✅ Correto
  business_info?: BusinessInfo;
};

export declare type TransactionData = {
  qr_code?: string;                    // ✅ Correto
  qr_code_base64?: string;             // ✅ Correto
  transaction_id?: string;
  bank_transfer_id?: number;
  financial_institution?: number;
  bank_info?: BankInfo;
  ticket_url?: string;                 // ✅ Correto
};

// ✅ As propriedades principais para PIX estão presentes
```

## 5. Preference Types - Propriedades Analisadas

### PreferenceResponse Interface

#### ✅ **Propriedades Corretas**
```typescript
// Verificadas contra documentação:
id?: string;                         // ✅ Correto
init_point?: string;                 // ✅ Correto
sandbox_init_point?: string;         // ✅ Correto
date_created?: string;               // ✅ Correto
items?: Array<Items>;                // ✅ Correto
payer?: Payer;                       // ✅ Correto
back_urls?: BackUrls;                // ✅ Correto
auto_return?: string;                // ✅ Correto
payment_methods?: PaymentMethods;    // ✅ Correto
notification_url?: string;           // ✅ Correto
external_reference?: string;         // ✅ Correto
```

#### ❌ **Propriedades Inconsistentes**

**1. collector_id Tipo**
```typescript
// No SDK:
collector_id?: number;               // ✅ Correto

// Na API geralmente aparece como number, está correto
```

## 6. Customer Types - Propriedades Analisadas

### CustomerResponse Interface

#### ❌ **Problemas Encontrados**

**1. Address Structure Inconsistente**
```typescript
// No SDK:
export declare type CustomerAddressRequest = {
  id: string;                        // ❌ Obrigatório, deveria ser opcional
  zip_code?: string;
  street_name: string;               // ❌ Obrigatório, deveria ser opcional  
  street_number: number;             // ❌ Obrigatório, deveria ser opcional
  city: CustomerAddressCity;         // ❌ Obrigatório, deveria ser opcional
};

// Deveria ser mais flexível baseado na API
```

**2. Identification Duplicated Properties**
```typescript
// No SDK commonTypes:
export declare type Identification = {
  type?: string;
  number?: string;
  identification?: number;           // ❌ Campo duplicado/confuso
};

// Deveria ser:
export declare type Identification = {
  type?: string;
  number?: string | number;          // Suportar ambos os tipos
};
```

## 7. Resumo de Problemas Críticos

### 🔴 **Problemas de Tipo de Dados**

1. **`issuer_id`**: String no SDK, Number na API
2. **`payer.id`**: String no SDK, Number na API  
3. **`payer.identification.number`**: String no SDK, Number na API
4. **`card.first_six_digits`**: String no SDK, Number na API
5. **`card.last_four_digits`**: String no SDK, Number na API

### 🟡 **Problemas de Estrutura**

1. **`Identification`**: Campo `identification?: number` duplicado/confuso
2. **`CustomerAddressRequest`**: Campos obrigatórios desnecessários
3. **Tipos rígidos**: Muitos campos que poderiam aceitar `string | number`

### 🔴 **Propriedades Completamente Faltantes**

Baseado na análise, a maioria das propriedades principais estão presentes. Os problemas são principalmente de **tipos incorretos** rather than propriedades faltantes.

## 8. Recomendações de Correção

### Prioridade Alta - Correções de Tipo

```typescript
// 1. Corrigir issuer_id
issuer_id?: number | string;  // Flexível para ambos

// 2. Corrigir Identification
export declare type Identification = {
  type?: string;
  number?: string | number;  // Suportar ambos
};

// 3. Corrigir Card digits
export declare type Card = {
  first_six_digits?: string | number;
  last_four_digits?: string | number;
  // ... outras propriedades
};

// 4. Corrigir Payer ID
export declare type Payer = {
  id?: string | number;  // Suportar ambos
  // ... outras propriedades
};
```

### Prioridade Média - Correções de Estrutura

```typescript
// 1. Simplificar CustomerAddressRequest
export declare type CustomerAddressRequest = {
  id?: string;           // Opcional
  zip_code?: string;
  street_name?: string;  // Opcional
  street_number?: number; // Opcional
  city?: CustomerAddressCity; // Opcional
};

// 2. Limpar Identification
export declare type Identification = {
  type?: string;
  number?: string | number;
  // Remover: identification?: number;
};
```

## Conclusão

O SDK Node.js do Mercado Pago tem **boa cobertura de propriedades**, mas apresenta **inconsistências críticas de tipos de dados**. Os principais problemas são:

1. **Tipos rígidos** onde a API aceita múltiplos tipos
2. **Campos como string** onde a API retorna numbers
3. **Estruturas obrigatórias** onde deveriam ser opcionais

Corrigir estes tipos melhorará significativamente a **compatibilidade** e **usabilidade** do SDK. 