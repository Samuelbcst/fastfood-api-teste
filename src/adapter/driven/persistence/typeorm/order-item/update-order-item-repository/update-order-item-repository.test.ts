vi.mock('../model', () => ({
  OrderItemModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UpdateOrderItemTypeORMRepository } from './update-order-item-repository'

const mockFindOneBy = vi.fn()
const mockSave = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  save: mockSave,
  manager: mockManager
}

describe('UpdateOrderItemTypeORMRepository', () => {
  let repository: UpdateOrderItemTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockSave.mockReset()
    mockDestroy.mockReset()
    repository = new UpdateOrderItemTypeORMRepository(mockRepository as any)
  })

  it('should update and return the order item if found', async () => {
    const orderItem = { id: 1, quantity: 2, unitPrice: 10, orderId: 1, productId: 1, updatedAt: new Date() }
    mockFindOneBy.mockResolvedValue(orderItem)
    mockSave.mockResolvedValue(orderItem)
    const result = await repository.execute({ id: 1, quantity: 5, price: 20, orderId: 2, productId: 3 })
    expect(result).toBe(orderItem)
    expect(orderItem.quantity).toBe(5)
    expect(orderItem.unitPrice).toBe(20)
    expect(orderItem.orderId).toBe(2)
    expect(orderItem.productId).toBe(3)
    expect(mockSave).toHaveBeenCalledWith(orderItem)
  })

  it('should return null if order item not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute({ id: 99 })
    expect(result).toBeNull()
    expect(mockSave).not.toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
