vi.mock('../model', () => ({
  ProductModel: class {}
}))
let mockInitialize: any
let mockGetRepository: any
let mockProductRepository: any
vi.mock('../../', () => ({
  default: {
    get initialize() { return mockInitialize },
    get getRepository() { return mockGetRepository }
  }
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeDeleteProductRepository } from './make-delete-product-repository'
import { DeleteProductTypeORMRepository } from './delete-product-repository'

describe('makeDeleteProductRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockProductRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a DeleteProductTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockProductRepository)
    const repo = await makeDeleteProductRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(DeleteProductTypeORMRepository)
  })
})

export {}
