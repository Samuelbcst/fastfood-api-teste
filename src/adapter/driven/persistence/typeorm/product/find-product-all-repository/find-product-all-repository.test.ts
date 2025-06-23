vi.mock('../model', () => ({
  ProductModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindProductAllTypeORMRepository } from './find-product-all-repository'

const mockFind = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  find: mockFind,
  manager: mockManager
}

describe('FindProductAllTypeORMRepository', () => {
  let repository: FindProductAllTypeORMRepository

  beforeEach(() => {
    mockFind.mockReset()
    mockDestroy.mockReset()
    repository = new FindProductAllTypeORMRepository(mockRepository as any)
  })

  it('should return all products', async () => {
    const fakeProducts = [
      { id: 1, name: 'A', description: 'desc', price: 10, categoryId: 1, active: true },
      { id: 2, name: 'B', description: 'desc2', price: 20, categoryId: 2, active: false }
    ]
    mockFind.mockResolvedValue(fakeProducts)
    const result = await repository.execute()
    expect(result).toBe(fakeProducts)
    expect(mockFind).toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
