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
import { makeUpdateProductRepository } from './make-update-product-repository'
import { UpdateProductTypeORMRepository } from './update-product-repository'

describe('makeUpdateProductRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockProductRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return an UpdateProductTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockProductRepository)
    const repo = await makeUpdateProductRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(UpdateProductTypeORMRepository)
  })
})

export {}
