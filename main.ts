import { Checkout } from './checkout';
import { PricingRule } from './pricingRule';

const pricingRules: PricingRule[] = [
  { item: 'op10', price: 849.99 },
  { item: 'op11', price: 949.99, bulkDiscount: { quantity: 4, price: 899.99 } },
  { item: 'buds', price: 129.99, discount: { quantity: 3, price: 129.99 * 2 } },
  { item: 'wtch', price: 229.99 },
];

const co = new Checkout(pricingRules);
co.scan('wtch');

const totalPrice = co.total();
console.log(`Total price: $${totalPrice}`);
