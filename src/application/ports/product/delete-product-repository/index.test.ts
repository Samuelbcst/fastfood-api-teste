import { describe, it, expect } from 'vitest';
import type { DeleteProductRepository } from './index';
import type { Product } from '../../../../domain/entities/product/product';

describe('DeleteProductRepository', () => {
  it('should implement execute and finish methods, returning Product or null', async () => {
    // Mock implementation
    class MockDeleteProductRepository implements DeleteProductRepository {
      async execute({ id }: { id: number }): Promise<Product | null> {
        if (id === 1) {
          return {
            id: 1,
            name: 'Test Product',
            price: 9.99,
            categoryId: 2,
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
    const repo = new MockDeleteProductRepository();
    const product = await repo.execute({ id: 1 });
    expect(product).not.toBeNull();
    expect(product?.id).toBe(1);
    const notFound = await repo.execute({ id: 999 });
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
