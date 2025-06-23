vi.mock('../model', () => ({
  OrderItemModel: class {}
}))

// Hoist the mock for OrderItemModel to avoid TypeORM metadata errors

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindOrderItemByIdTypeORMRepository } from './find-order-item-by-id-repository'

const mockFindOneBy = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  manager: mockManager
}

describe('FindOrderItemByIdTypeORMRepository', () => {
  let repository: FindOrderItemByIdTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockDestroy.mockReset()
    repository = new FindOrderItemByIdTypeORMRepository(mockRepository as any)
  })

  it('should return the order item by id', async () => {
    const fakeOrderItem = { id: 123, orderId: 1, productId: 2, quantity: 3, price: 10 }
    mockFindOneBy.mockResolvedValue(fakeOrderItem)
    const result = await repository.execute(123)
    expect(result).toBe(fakeOrderItem)
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 123 })
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
