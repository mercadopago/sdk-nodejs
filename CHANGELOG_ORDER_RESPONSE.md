# Changelog Order Response

## Análise de Compatibilidade - 2024-03-21

### Arquivo Analisado
- `src/clients/order/commonTypes.ts`

### Resultado da Análise
Após análise detalhada do contrato JSON fornecido e comparação com a estrutura existente no SDK, foi identificado que a interface `OrderResponse` já contempla todas as propriedades necessárias e segue corretamente os padrões do projeto.

### Comparação

#### Estrutura Atual vs JSON Fornecido
- Todas as propriedades do JSON estão presentes no contrato atual
- O contrato atual possui propriedades adicionais que permitem maior flexibilidade
- A tipagem e nomenclatura seguem os padrões do projeto
- Não foram necessárias alterações no contrato

### Mapeamento de Propriedades
Todas as propriedades do JSON estão mapeadas na interface `OrderResponse`:

```typescript
export declare interface OrderResponse extends ApiResponse {
  id?: string;                    // ✓ Presente
  type?: string;                  // ✓ Presente
  processing_mode?: string;       // ✓ Presente
  external_reference?: string;    // ✓ Presente
  description?: string;           // ✓ Presente
  marketplace?: string;           // ✓ Presente
  marketplace_fee?: string;       // ✓ Presente
  total_amount?: string;          // ✓ Presente
  total_paid_amount?: string;     // ✓ Presente
  country_code?: string;          // ✓ Presente
  user_id?: string;               // ✓ Presente
  status?: string;                // ✓ Presente
  status_detail?: string;         // ✓ Presente
  capture_mode?: string;          // ✓ Presente
  created_date?: string;          // ✓ Presente
  last_updated_date?: string;     // ✓ Presente
  integration_data?: IntegrationDataResponse;  // ✓ Presente
  transactions?: TransactionsResponse;         // ✓ Presente
  items?: Item[];                 // ✓ Presente
}
```

### JSON de Exemplo
```json
{
  "id": "ORD01HRYFWNYRE1MR1E60MW3X0T2P",
  "type": "online",
  "processing_mode": "automatic",
  "external_reference": "ext_ref_1234",
  "description": "some description",
  "marketplace": "NONE",
  "marketplace_fee": "10.00",
  "total_amount": "1000.00",
  "total_paid_amount": "1000.00",
  "country_code": "BRA",
  "user_id": "1245621468",
  "status": "processed",
  "status_detail": "accredited",
  "capture_mode": "automatic_async",
  "created_date": "2024-11-21T14:19:14.727Z",
  "last_updated_date": "2024-11-21T14:19:18.489Z",
  "integration_data": {
    "application_id": "130106526144588"
  },
  "transactions": {
    "payments": [
      {
        "id": "PAY01JD7HETD7WX4W31VA60R1KC8E",
        "amount": "1000.00",
        "paid_amount": "1000.00",
        "expiration_time": "P1D",
        "date_of_expiration": "2024-01-01T00:00:00.000-03:00",
        "reference_id": "22dvqmsf4yc",
        "status": "processed",
        "status_detail": "accredited",
        "payment_method": {
          "id": "master",
          "type": "credit_card",
          "token": "677859ef5f18ea7e3a87c41d02c3fbe3",
          "statement_descriptor": "LOJA X",
          "installments": 1
        }
      }
    ]
  },
  "items":[
    {
    "external_code": "item_external_code",
    "category_id": "category_id",
    "title": "Some item title",
    "description": "Some item description",
    "unit_price": "1000.00",
    "type": "item type",
    "picture_url": "https://mysite.com/img/item.jpg",
    "quantity": 1
  }
  ]
}
``` 