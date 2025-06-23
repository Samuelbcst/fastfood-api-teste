vi.mock('../model', () => ({
  PaymentModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TypeOrmCreatePaymentRepository } from './create-payment-repository'
import { PaymentStatus } from '../../../../../../core/domain/payment/payment'

const mockCreate = vi.fn()
const mockSave = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  create: mockCreate,
  save: mockSave,
  manager: mockManager
}

describe('TypeOrmCreatePaymentRepository', () => {
  let repository: TypeOrmCreatePaymentRepository

  beforeEach(() => {
    mockCreate.mockReset()
    mockSave.mockReset()
    mockDestroy.mockReset()
    repository = new TypeOrmCreatePaymentRepository(mockRepository as any)
  })

  it('should create and save a payment', async () => {
    const paymentData = { orderId: 1, amount: 100, paymentStatus: PaymentStatus.PAID, paidAt: new Date() }
    const fakePayment = { ...paymentData }
    mockCreate.mockReturnValue(fakePayment)
    mockSave.mockResolvedValue(fakePayment)
    const result = await repository.create(paymentData)
    expect(mockCreate).toHaveBeenCalledWith(paymentData)
    expect(mockSave).toHaveBeenCalledWith(fakePayment)
    expect(result).toBe(fakePayment)
  })

  it('should call destroy on finish', async () => {
    await repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
