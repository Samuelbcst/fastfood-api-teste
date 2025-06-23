import { describe, it, expect } from 'vitest';
import type { FindProductAllRepository } from './index';
import type { Product } from '../../../../domain/product/product';

describe('FindProductAllRepository', () => {
  it('should implement execute and finish methods from RepositoryBase, returning an array of Product', async () => {
    // Mock implementation
    class MockFindProductAllRepository implements FindProductAllRepository {
      async execute(): Promise<Product[]> {
        return [
          {
            id: 1,
            name: 'Product 1',
            price: 10.5,
            categoryId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: 'Product 2',
            price: 20.0,
            categoryId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
      async finish(): Promise<void> {
        // no-op
      }
    }
    const repo = new MockFindProductAllRepository();
    const products = await repo.execute();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(2);
    expect(products[0].name).toBe('Product 1');
    expect(products[1].name).toBe('Product 2');
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
