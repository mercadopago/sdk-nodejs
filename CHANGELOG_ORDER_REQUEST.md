# Changelog Order Request

## Análise de Compatibilidade - 2024-03-21

### Arquivo Analisado
- `src/clients/order/create/types.ts`

### Resultado da Análise
Após análise detalhada do contrato JSON fornecido e comparação com a estrutura existente no SDK, foi identificado que a interface `CreateOrderRequest` já contempla todas as propriedades necessárias e segue corretamente os padrões do projeto.

### Comparação

#### Estrutura Atual vs JSON Fornecido
- Todas as propriedades do JSON estão presentes no contrato atual
- O contrato atual possui propriedades adicionais que permitem maior flexibilidade
- A tipagem e nomenclatura seguem os padrões do projeto
- Não foram necessárias alterações no contrato

### JSON de Exemplo
```json
{
  "type": "online",
  "total_amount": "1000.00",
  "external_reference": "ext_ref_1234",
  "capture_mode": "automatic_async",
  "transactions": {
    "payments": [
      {
        "amount": "1000.00",
        "expiration_time": "P1D",
        "payment_method": {
          "id": "master",
          "type": "credit_card",
          "token": "677859ef5f18ea7e3a87c41d02c3fbe3",
          "installments": 1,
          "statement_descriptor": "LOJA X"
        }
      }
    ]
  },
  "processing_mode": "automatic",
  "description": "some description",
  "payer": {
    "entity_type": "individual",
    "email": "test_123@testuser.com",
    "first_name": "John",
    "last_name": "Doe",
    "identification": {
      "type": "CPF",
      "number": "15635614680"
    },
    "phone": {
      "area_code": "55",
      "number": "99999999999"
    },
    "address": {
      "street_name": "R. Ângelo Piva",
      "street_number": "144",
      "zip_code": "06210110",
      "neighborhood": "Presidente Altino",
      "city": "Osasco",
      "state": "SP",
      "complement": "303"
    }
  },
  "marketplace": "NONE",
  "marketplace_fee": "10.00",
  "items": [
    {
      "title": "Some item title",
      "unit_price": "1000.00",
      "quantity": 1,
      "description": "Some item description",
      "external_code": "item_external_code",
      "category_id": "category_id",
      "type": "item type",
      "picture_url": "https://mysite.com/img/item.jpg"
    }
  ],
  "expiration_time": "P3D"
}
``` 