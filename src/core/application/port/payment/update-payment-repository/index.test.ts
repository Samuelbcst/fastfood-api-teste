import { describe, it, expect } from 'vitest';
import type { UpdatePaymentRepository } from './index';
import type { Payment } from '../../../../domain/payment/payment';
import { PaymentStatus } from '../../../../domain/payment/payment';

describe('UpdatePaymentRepository', () => {
  it('should implement execute and finish methods from RepositoryBase, returning updated Payment or null', async () => {
    // Mock implementation
    class MockUpdatePaymentRepository implements UpdatePaymentRepository {
      async execute(input: { id: number; amount?: number; status?: string }): Promise<Payment | null> {
        if (input.id === 1) {
          return {
            id: 1,
            orderId: 10,
            amount: input.amount ?? 100.00,
            paymentStatus: input.status === 'PAID' ? PaymentStatus.PAID : PaymentStatus.NOT_PAID,
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
    const repo = new MockUpdatePaymentRepository();
    const updated = await repo.execute({ id: 1, status: 'PAID' });
    expect(updated).not.toBeNull();
    expect(updated?.id).toBe(1);
    expect(updated?.paymentStatus).toBe(PaymentStatus.PAID);
    const notFound = await repo.execute({ id: 999 });
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
