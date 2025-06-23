import { describe, it, expect } from 'vitest';
import type { FindPaymentByIdRepository } from './index';
import type { Payment } from '../../../../domain/payment/payment';
import { PaymentStatus } from '../../../../domain/payment/payment';

describe('FindPaymentByIdRepository', () => {
  it('should implement execute and finish methods from RepositoryBase, returning Payment or null', async () => {
    // Mock implementation
    class MockFindPaymentByIdRepository implements FindPaymentByIdRepository {
      async execute(id: number): Promise<Payment | null> {
        if (id === 1) {
          return {
            id: 1,
            orderId: 10,
            amount: 100.00,
            paymentStatus: PaymentStatus.PAID,
            paidAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        return null;
      }
      async finish(): Promise<void> {
        // no-op
      }
    }
    const repo = new MockFindPaymentByIdRepository();
    const payment = await repo.execute(1);
    expect(payment).not.toBeNull();
    expect(payment?.id).toBe(1);
    const notFound = await repo.execute(999);
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
