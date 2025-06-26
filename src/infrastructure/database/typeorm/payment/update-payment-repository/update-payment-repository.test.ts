vi.mock('../model', () => ({
  PaymentModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UpdatePaymentTypeORMRepository } from './update-payment-repository'
import { PaymentStatus } from '../../../../../domain/entities/payment/payment'

const mockFindOneBy = vi.fn()
const mockSave = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  findOneBy: mockFindOneBy,
  save: mockSave,
  manager: mockManager
}

describe('UpdatePaymentTypeORMRepository', () => {
  let repository: UpdatePaymentTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    mockSave.mockReset()
    mockDestroy.mockReset()
    repository = new UpdatePaymentTypeORMRepository(mockRepository as any)
  })

  it('should update and return the payment if found', async () => {
    const payment = { id: 1, orderId: 2, paymentStatus: PaymentStatus.PAID, paidAt: new Date(), updatedAt: new Date() }
    mockFindOneBy.mockResolvedValue(payment)
    mockSave.mockResolvedValue(payment)
    const result = await repository.execute({ id: 1, orderId: 3, paymentStatus: PaymentStatus.NOT_PAID, paidAt: new Date() })
    expect(result).toBe(payment)
    expect(mockSave).toHaveBeenCalledWith(payment)
  })

  it('should return null if payment not found', async () => {
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
