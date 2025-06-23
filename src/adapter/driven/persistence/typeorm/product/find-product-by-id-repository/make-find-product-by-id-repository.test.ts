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
import { makeFindProductByIdRepository } from './make-find-product-by-id-repository'
import { FindProductByIdTypeORMRepository } from './find-product-by-id-repository'

describe('makeFindProductByIdRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockProductRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a FindProductByIdTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockProductRepository)
    const repo = await makeFindProductByIdRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(FindProductByIdTypeORMRepository)
  })
})

export {}
