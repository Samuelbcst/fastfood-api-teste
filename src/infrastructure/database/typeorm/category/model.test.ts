import { describe, it, expect } from 'vitest';
import { CategoryModel } from './model';

describe('CategoryModel', () => {
  it('should be defined', () => {
    expect(CategoryModel).toBeDefined();
  });

  it('should create a CategoryModel instance with default values', () => {
    const category = new CategoryModel();
    expect(category.id).toBe(0);
    expect(category.name).toBe('');
    expect(category.description).toBeUndefined();
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);
  });
});
