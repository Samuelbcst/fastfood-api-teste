import { describe, it, expect } from 'vitest';
import type { FindPaymentAllRepository } from './index';
import type { Payment } from '../../../../domain/payment/payment';
import { PaymentStatus } from '../../../../domain/payment/payment';

describe('FindPaymentAllRepository', () => {
  it('should implement execute and finish methods from RepositoryBase, returning an array of Payment', async () => {
    // Mock implementation
    class MockFindPaymentAllRepository implements FindPaymentAllRepository {
      async execute(): Promise<Payment[]> {
        return [
          { id: 1, orderId: 10, amount: 100.00, paymentStatus: PaymentStatus.PAID, paidAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
          { id: 2, orderId: 11, amount: 50.00, paymentStatus: PaymentStatus.NOT_PAID, paidAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
        ];
      }
      async finish(): Promise<void> {
        // no-op
      }
    }
    const repo = new MockFindPaymentAllRepository();
    const payments = await repo.execute();
    expect(Array.isArray(payments)).toBe(true);
    expect(payments.length).toBe(2);
    expect(payments[0].id).toBe(1);
    expect(payments[1].id).toBe(2);
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
