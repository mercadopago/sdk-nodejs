export declare type Source = {
  id: string;
  name: string;
  type: string;
};

export declare type RefundResponse = {
  id: number;
  payment_id: number;
  amount: number;
  metadata: any;
  source: Source;
  date_created: string;
  unique_sequence_number: string;
  refund_mode: string;
  adjustment_amount: number;
  status: string;
  reason: string;
  label: Array<string>;
  amount_refunded_to_payer: number;
  partition_details: Array<string>;
};
