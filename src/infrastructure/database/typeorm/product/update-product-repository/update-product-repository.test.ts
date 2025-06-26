vi.mock('../model', () => ({
  ProductModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UpdateProductTypeORMRepository } from './update-product-repository'

const mockFindOneBy = vi.fn()
const mockSave = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  save: mockSave,
  manager: mockManager
}

describe('UpdateProductTypeORMRepository', () => {
  let repository: UpdateProductTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockSave.mockReset()
    mockDestroy.mockReset()
    repository = new UpdateProductTypeORMRepository(mockRepository as any)
  })

  it('should update and return the product if found', async () => {
    const product = { id: 1, name: 'A', description: 'desc', price: 10, categoryId: 1, updatedAt: new Date() }
    mockFindOneBy.mockResolvedValue(product)
    mockSave.mockResolvedValue(product)
    const result = await repository.execute({ id: 1, name: 'B', price: 20 })
    expect(result).toBe(product)
    expect(product.name).toBe('B')
    expect(product.price).toBe(20)
    expect(mockSave).toHaveBeenCalledWith(product)
  })

  it('should return null if product not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute({ id: 99 })
    expect(result).toBeNull()
    expect(mockSave).not.toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
