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
import { makeFindProductAllRepository } from './make-find-product-all-repository'
import { FindProductAllTypeORMRepository } from './find-product-all-repository'

describe('makeFindProductAllRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockProductRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a FindProductAllTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockProductRepository)
    const repo = await makeFindProductAllRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(FindProductAllTypeORMRepository)
  })
})

export {}
