import { PricingRule } from './pricingRule';

export class Checkout {
  private pricingRules: PricingRule[];
  private items: string[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
    this.items = [];
  }

  scan(item: string) {
    this.items.push(item);
  }

  total(): number {
    const itemCount: Record<string, number> = {};
    let totalPrice = 0;
    for (const item of this.items) {
      if (itemCount[item]) {
        itemCount[item]++;
      } else {
        itemCount[item] = 1;
      }
    }


    for (const item in itemCount) {
      const quantity = itemCount[item];
      const pricingRule = this.findPricingRule(item);
      const price = this.calculateItemPrice(item, quantity, pricingRule);
      totalPrice += price;
    }

    return totalPrice;
  }

  private findPricingRule(item: string): PricingRule | undefined {
    return this.pricingRules.find(rule => rule.item === item);
  }

  private calculateItemPrice(
    item: string,
    quantity: number,
    pricingRule?: PricingRule
  ): number {
    if (!pricingRule) {
      throw new Error(`Pricing rule not found for item ${item}`);
    }

    const { price, discount, bulkDiscount } = pricingRule;

    if (discount && quantity >= discount.quantity) {
      const numDiscounts = Math.floor(quantity / discount.quantity);
      return numDiscounts * discount.price + (quantity % discount.quantity) * price;
    }

    if (bulkDiscount && quantity >= bulkDiscount.quantity) {
      return quantity * bulkDiscount.price;
    }

    return quantity * price;
  }
}
