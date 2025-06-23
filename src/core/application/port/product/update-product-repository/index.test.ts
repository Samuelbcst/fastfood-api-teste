import { describe, it, expect } from 'vitest';
import type { UpdateProductRepository } from './index';
import type { Product } from '../../../../domain/product/product';

describe('UpdateProductRepository', () => {
  it('should implement execute and finish methods, updating and returning Product or null', async () => {
    class MockUpdateProductRepository implements UpdateProductRepository {
      async execute({ id, ...updates }: { id: number; name?: string; description?: string; price?: number; categoryId?: number }): Promise<Product | null> {
        if (id === 1) {
          return {
            id: 1,
            name: updates.name ?? 'Updated Product',
            price: updates.price ?? 19.99,
            categoryId: updates.categoryId ?? 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        return null;
      }
      async finish(): Promise<void> {}
    }
    const repo = new MockUpdateProductRepository();
    const updated = await repo.execute({ id: 1, name: 'New Name' });
    expect(updated).not.toBeNull();
    expect(updated?.name).toBe('New Name');
    const notFound = await repo.execute({ id: 999 });
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
