vi.mock('../model', () => ({
  PaymentModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindPaymentAllTypeORMRepository } from './find-payment-all-repository'

const mockFind = vi.fn()
const mockDestroy = vi.fn()
const mockManager = { connection: { destroy: mockDestroy } }

const mockRepository = {
  find: mockFind,
  manager: mockManager
}

describe('FindPaymentAllTypeORMRepository', () => {
  let repository: FindPaymentAllTypeORMRepository

  beforeEach(() => {
    mockFind.mockReset()
    mockDestroy.mockReset()
    repository = new FindPaymentAllTypeORMRepository(mockRepository as any)
  })

  it('should return all payments', async () => {
    const fakePayments = [
      { id: 1, orderId: 2, paymentStatus: 'PAID', paidAt: new Date() },
      { id: 2, orderId: 3, paymentStatus: 'NOT_PAID', paidAt: new Date() }
    ]
    mockFind.mockResolvedValue(fakePayments)
    const result = await repository.execute()
    expect(result).toBe(fakePayments)
    expect(mockFind).toHaveBeenCalled()
  })

  it('should call destroy on finish', () => {
    repository.finish()
    expect(mockDestroy).toHaveBeenCalled()
  })
})

export {}
