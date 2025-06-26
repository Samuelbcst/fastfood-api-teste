vi.mock('../model', () => ({
  PaymentModel: class {}
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FindPaymentByIdTypeORMRepository } from './find-payment-by-id-repository'

const mockFindOneBy = vi.fn()
const mockRepository = {
  findOneBy: mockFindOneBy
}

describe('FindPaymentByIdTypeORMRepository', () => {
  let repository: FindPaymentByIdTypeORMRepository

  beforeEach(() => {
    mockFindOneBy.mockReset()
    repository = new FindPaymentByIdTypeORMRepository(mockRepository as any)
  })

  it('should return the payment if found', async () => {
    const fakePayment = { id: 1, orderId: 2, paymentStatus: 'PAID', paidAt: new Date() }
    mockFindOneBy.mockResolvedValue(fakePayment)
    const result = await repository.execute(1)
    expect(mockFindOneBy).toHaveBeenCalledWith({ id: 1 })
    expect(result).toEqual(fakePayment)
  })

  it('should return null if payment not found', async () => {
    mockFindOneBy.mockResolvedValue(null)
    const result = await repository.execute(99)
    expect(result).toBeNull()
  })
})

export {}
