vi.mock('../model', () => ({
  ProductModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindProductByCategoryTypeORMRepository } from './find-product-by-category-repository'

const mockFindBy = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findBy: mockFindBy,
  manager: mockManager
}

describe('FindProductByCategoryTypeORMRepository', () => {
  let repository: FindProductByCategoryTypeORMRepository

  beforeEach(() => {
    mockFindBy.mockReset()
    mockDestroy.mockReset()
    repository = new FindProductByCategoryTypeORMRepository(mockRepository as any)
  })

  it('should return products by category', async () => {
    const fakeProducts = [
      { id: 1, name: 'A', description: 'desc', price: 10, categoryId: 1, active: true },
      { id: 2, name: 'B', description: 'desc2', price: 20, categoryId: 1, active: false }
    ]
    mockFindBy.mockResolvedValue(fakeProducts)
    const result = await repository.execute(1)
    expect(result).toBe(fakeProducts)
    expect(mockFindBy).toHaveBeenCalledWith({ categoryId: 1 })
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
