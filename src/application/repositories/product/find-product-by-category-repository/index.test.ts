import { describe, it, expect } from 'vitest';
import type { FindProductByCategoryRepository } from './index';
import type { Product } from '../../../../domain/entities/product/product';

describe('FindProductByCategoryRepository', () => {
  it('should implement execute and finish methods, returning Product[] or null', async () => {
    class MockFindProductByCategoryRepository implements FindProductByCategoryRepository {
      async execute(categoryId: number): Promise<Product[] | null> {
        if (categoryId === 2) {
          return [
            {
              id: 1,
              name: 'Product 1',
              price: 10.0,
              categoryId: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: 2,
              name: 'Product 2',
              price: 20.0,
              categoryId: 2,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
        }
        return null;
      }
      async finish(): Promise<void> {}
    }
    const repo = new MockFindProductByCategoryRepository();
    const products = await repo.execute(2);
    expect(products).not.toBeNull();
    expect(products?.length).toBe(2);
    const notFound = await repo.execute(999);
    expect(notFound).toBeNull();
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
