import { describe, it, expect } from 'vitest';
import { OrderModel } from './model';
import { OrderStatus } from '../../../../../core/domain/order/order';

describe('OrderModel', () => {
  it('should be defined', () => {
    expect(OrderModel).toBeDefined();
  });

  it('should create an OrderModel instance with default values', () => {
    const order = new OrderModel();
    expect(order.id).toBe(0);
    expect(order.clientId).toBeUndefined();
    expect(order.items).toBeUndefined();
    expect(order.status).toBe(OrderStatus.RECEIVED);
    expect(order.createdAt).toBeInstanceOf(Date);
    expect(order.statusUpdatedAt).toBeInstanceOf(Date);
    expect(order.updatedAt).toBeInstanceOf(Date);
    expect(order.totalAmount).toBe(0);
    expect(order.pickupCode).toBeUndefined();
  });
});
