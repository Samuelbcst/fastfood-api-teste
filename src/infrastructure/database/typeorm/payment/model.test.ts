import { describe, it, expect } from 'vitest';
import { PaymentModel } from './model';
import { PaymentStatus } from '../../../../domain/entities/payment/payment';

describe('PaymentModel', () => {
  it('should be defined', () => {
    expect(PaymentModel).toBeDefined();
  });

  it('should create a PaymentModel instance with default values', () => {
    const payment = new PaymentModel();
    expect(payment.id).toBe(0);
    expect(payment.orderId).toBe(0);
    expect(payment.order).toBeUndefined();
    expect(payment.paymentStatus).toBe(PaymentStatus.NOT_PAID);
    expect(payment.paidAt).toBeInstanceOf(Date);
    expect(payment.createdAt).toBeInstanceOf(Date);
    expect(payment.updatedAt).toBeInstanceOf(Date);
  });
});
