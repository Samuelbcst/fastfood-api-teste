vi.mock('../model', () => ({
  ProductModel: class {
    static create = vi.fn()
    save = vi.fn()
  }
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TypeOrmCreateProductRepository } from './create-product-repository'
import { ProductModel } from '../model'

const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }
const mockRepository = {
  manager: mockManager
}

describe('TypeOrmCreateProductRepository', () => {
  let repository: TypeOrmCreateProductRepository
  let mockProductInstance: any

  beforeEach(() => {
    mockDestroy.mockReset()
    mockProductInstance = { save: vi.fn() }
    ;(ProductModel.create as any).mockReset()
    ;(ProductModel.create as any).mockReturnValue(mockProductInstance)
    repository = new TypeOrmCreateProductRepository(mockRepository as any)
  })

  it('should create and save a product', async () => {
    const productData = { name: 'Test', description: 'Desc', price: 10, categoryId: 1, active: true }
    mockProductInstance.save.mockResolvedValue(mockProductInstance)
    const result = await repository.create(productData)
    expect(ProductModel.create).toHaveBeenCalledWith(productData)
    expect(mockProductInstance.save).toHaveBeenCalled()
    expect(result).toBe(mockProductInstance)
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
