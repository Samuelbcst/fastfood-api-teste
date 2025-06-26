vi.mock('../model', () => ({
  PaymentModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { DeletePaymentTypeORMRepository } from './delete-payment-repository'

const mockFindOneBy = vi.fn()
const mockRemove = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  remove: mockRemove,
  manager: mockManager
}

describe('DeletePaymentTypeORMRepository', () => {
  let repository: DeletePaymentTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockRemove.mockReset()
    mockDestroy.mockReset()
    repository = new DeletePaymentTypeORMRepository(mockRepository as any)
  })

  it('should delete and return the payment if found', async () => {
    const fakePayment = { id: 1, orderId: 2, paymentStatus: 'PAID', paidAt: new Date() }
    mockFindOneBy.mockResolvedValue(fakePayment)
    mockRemove.mockResolvedValue(fakePayment)
    const result = await repository.execute({ id: 1 })
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 })
    expect(mockRemove).toHaveBeenCalledWith(fakePayment)
    expect(result).toBe(fakePayment)
  })

  it('should return null if payment not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute({ id: 99 })
    expect(result).toBeNull()
    expect(mockRemove).not.toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
