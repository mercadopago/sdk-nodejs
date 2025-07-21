# Releases

## VERSION 2.8.0

- Add Network-Transaction-ID
- Add `card_number`, `expiration_month` and `expiration_year` fields to Card Token request
- Add `email` to create customer example

## VERSION 2.7.0

- Add Order industry fields
- Fix Identification cycling import

## VERSION 2.6.0

- Add industry data and create a sample of PaymentCreateRequest with industry data fields.

## VERSION 2.5.0

- Add three_d_secure_mode to types.ts

## VERSION 2.4.0

- Feature: Order

## VERSION 2.3.0

- Add `X-Test-Token` header to request options

## VERSION 2.2.0

- Include `network_transaction_data` in `forward_data` in Payment

## VERSION 2.1.1

- Fix `X-Expand-Responde-Nodes` header to request options

## VERSION 2.1.0

- Add `X-Expand-Response-Nodes` header to request options
- Add `X-Card-Validation` header to request options
- Add `X-Meli-Session-Id` header to request options

## VERSION 2.0.15

- Include `reference_id` in Data in Payment Method in Payment
- Include `external_reference_id` in Data in Payment Method in Payment
- Include `external_resource_url` in Data in Payment Method in Payment

## VERSION 2.0.14

- Change application_fee type for number

## VERSION 2.0.13

- Include point of interaction sub type

## VERSION 2.0.12

- Include 3DS MPI Externo fields in Payment

## VERSION 2.0.11

- Include SubMerchant in ForwardData in Payment

## VERSION 2.0.10

- Update braces from 3.0.2 to 3.0.3
- Fix the properties street_number to string
- Include TransactionDetailsRequest in Create Payment

## VERSION 2.0.9

- Add sponsor_id to PaymentCreateRequest

## VERSION 2.0.7

- Add barcode, digitable_line, verification_code to TransactionDetails

## VERSION 2.0.6

- Add transaction_id to TransactionDetails

## VERSION 2.0.5

- Add Point of Interaction to the root and Address to Payer
- Refactoring e2e tests, createCardToken and createEmailTestUser

## VERSION 2.0.4

- Fix payment search types
- Optional returns on payment search

## VERSION 2.0.3

- Hotfix build

## VERSION 2.0.2

- Adjusted user types
- Adjusted user merchant order
- Integration tests added

## VERSION 2.0.1

- Added named export to MercadoPago configuration module
- Modified integration example in readme
- Adjusted PR template
- Adjusted gitflow files

## VERSION 2.0.0

Release SDK Node Mercado Pago V2

- TypeScript Support ⭐️
- Type of all requests and all responses
- Maintained compatibility with Vanilla Javascript

Tests

- More than 90% coverage of unit tests
- Documentation
- Implementation examples from ALL clients
- Technical Documentation
- Melhorias no Readme
- Contribution template

Technical debits

- Code registration
- Removal of vulnerable libraries and without recent updates
- Registration with other Mercado Pago SDKs
- Individual Request configuration for client
