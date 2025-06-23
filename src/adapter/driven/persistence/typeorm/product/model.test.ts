import { describe, it, expect } from 'vitest';
import { ProductModel } from './model';

describe('ProductModel', () => {
  it('should be defined', () => {
    expect(ProductModel).toBeDefined();
  });

  it('should create a ProductModel instance with default values', () => {
    const product = new ProductModel();
    expect(product.id).toBe(0);
    expect(product.name).toBe('');
    expect(product.description).toBeUndefined();
    expect(product.price).toBe(0);
    expect(product.categoryId).toBe(0);
    expect(product.category).toBeUndefined();
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.updatedAt).toBeInstanceOf(Date);
    expect(product.active).toBeUndefined();
  });
});
