import { describe, it, expect } from 'vitest';
import type { FindProductByIdRepository } from './index';
import type { Product } from '../../../../domain/entities/product/product';

describe('FindProductByIdRepository', () => {
  it('should implement execute and finish methods, returning Product or null', async () => {
    class MockFindProductByIdRepository implements FindProductByIdRepository {
      async execute(id: number): Promise<Product | null> {
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
      async finish(): Promise<void> {}
    }
    const repo = new MockFindProductByIdRepository();
    const product = await repo.execute(1);
    expect(product).not.toBeNull();
    expect(product?.id).toBe(1);
    const notFound = await repo.execute(999);
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
