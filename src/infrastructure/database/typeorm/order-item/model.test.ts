import { describe, it, expect } from 'vitest';
import { OrderItemModel } from './model';

describe('OrderItemModel', () => {
  it('should be defined', () => {
    expect(OrderItemModel).toBeDefined();
  });

  it('should create an OrderItemModel instance with default values', () => {
    const orderItem = new OrderItemModel();
    expect(orderItem.id).toBe(0);
    expect(orderItem.orderId).toBe(0);
    expect(orderItem.productId).toBe(0);
    expect(orderItem.productName).toBe('');
    expect(orderItem.unitPrice).toBe(0);
    expect(orderItem.quantity).toBe(0);
    expect(orderItem.order).toBeUndefined();
    expect(orderItem.product).toBeUndefined();
    expect(orderItem.createdAt).toBeInstanceOf(Date);
    expect(orderItem.updatedAt).toBeInstanceOf(Date);
  });
});
