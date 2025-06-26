vi.mock('../model', () => ({
  ProductModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindProductByIdTypeORMRepository } from './find-product-by-id-repository'

const mockFindOneBy = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  manager: mockManager
}

describe('FindProductByIdTypeORMRepository', () => {
  let repository: FindProductByIdTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockDestroy.mockReset()
    repository = new FindProductByIdTypeORMRepository(mockRepository as any)
  })

  it('should return the product if found', async () => {
    const fakeProduct = { id: 1, name: 'Test', description: 'Desc', price: 10, categoryId: 1, active: true }
    mockFindOneBy.mockResolvedValue(fakeProduct)
    const result = await repository.execute(1)
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 })
    expect(result).toBe(fakeProduct)
  })

  it('should return null if product not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute(99)
    expect(result).toBeNull()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
