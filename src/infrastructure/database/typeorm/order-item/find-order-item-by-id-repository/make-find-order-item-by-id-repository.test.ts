let mockInitialize: any
let mockGetRepository: any
let mockOrderItemRepository: any

vi.mock('../model', () => ({
  OrderItemModel: class {}
}))
vi.mock('../..', () => ({
  default: {
    get initialize() { return mockInitialize },
    get getRepository() { return mockGetRepository }
  }
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeFindOrderItemByIdRepository } from './make-find-order-item-by-id-repository'
import { FindOrderItemByIdTypeORMRepository } from './find-order-item-by-id-repository'

describe('makeFindOrderItemByIdRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockOrderItemRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a FindOrderItemByIdTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockOrderItemRepository)
    const repo = await makeFindOrderItemByIdRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(FindOrderItemByIdTypeORMRepository)
  })
})

export {}
