vi.mock('../model', () => ({
  ProductModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DeleteProductTypeORMRepository } from './delete-product-repository'

const mockFindOneBy = vi.fn()
const mockRemove = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  remove: mockRemove,
  manager: mockManager
}

describe('DeleteProductTypeORMRepository', () => {
  let repository: DeleteProductTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockRemove.mockReset()
    mockDestroy.mockReset()
    repository = new DeleteProductTypeORMRepository(mockRepository as any)
  })

  it('should delete and return the product if found', async () => {
    const fakeProduct = { id: 1, name: 'Test', description: 'Desc', price: 10, categoryId: 1, active: true }
    mockFindOneBy.mockResolvedValue(fakeProduct)
    mockRemove.mockResolvedValue(fakeProduct)
    const result = await repository.execute({ id: 1 })
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 })
    expect(mockRemove).toHaveBeenCalledWith(fakeProduct)
    expect(result).toBe(fakeProduct)
  })

  it('should return null if product not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute({ id: 99 })
    expect(result).toBeNull()
    expect(mockRemove).not.toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
