export interface PricingRule {
  item: string;
  price: number;
  discount?: {
    quantity: number;
    price: number;
  };
  bulkDiscount?: {
    quantity: number;
    price: number;
  };
}