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
import { makeCreateProductRepository } from './make-create-product-repository'
import { TypeOrmCreateProductRepository } from './create-product-repository'

describe('makeCreateProductRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockProductRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a TypeOrmCreateProductRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockProductRepository)
    const repo = await makeCreateProductRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(TypeOrmCreateProductRepository)
  })
})

export {}
