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
import { makeUpdateOrderItemRepository } from './make-update-order-item-repository'
import { UpdateOrderItemTypeORMRepository } from './update-order-item-repository'

let mockInitialize: any
let mockGetRepository: any
let mockOrderItemRepository: any

describe('makeUpdateOrderItemRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockOrderItemRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return an UpdateOrderItemTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockOrderItemRepository)
    const repo = await makeUpdateOrderItemRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(UpdateOrderItemTypeORMRepository)
  })
})

export {}
