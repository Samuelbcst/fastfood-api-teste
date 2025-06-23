import { describe, it, expect } from 'vitest';
import type { CreateProductRepository } from './index';
import type { Product } from '../../../../domain/product/product';
import { BaseEntity } from '../../../../domain/base-entity';

describe('CreateProductRepository', () => {
  it('should implement create and finish methods, returning a Product', async () => {
    // Mock implementation
    class MockCreateProductRepository implements CreateProductRepository {
      async create(input: Omit<Product, keyof BaseEntity>): Promise<Product> {
        return {
          id: 1,
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
      async finish(): Promise<void> {
        // no-op
      }
    }
    const repo = new MockCreateProductRepository();
    const input = {
      name: 'Test Product',
      price: 9.99,
      categoryId: 2,
      description: 'A test product',
      active: true,
    };
    const product = await repo.create(input);
    expect(product).toHaveProperty('id');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(9.99);
    expect(product.categoryId).toBe(2);
    expect(product.description).toBe('A test product');
    expect(product.active).toBe(true);
    await expect(repo.finish()).resolves.toBeUndefined();
  });
});
