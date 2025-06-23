vi.mock('../model', () => ({
  PaymentModel: class {}
}))
let mockInitialize: any
let mockGetRepository: any
let mockPaymentRepository: any
vi.mock('../../', () => ({
  default: {
    get initialize() { return mockInitialize },
    get getRepository() { return mockGetRepository }
  }
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeDeletePaymentRepository } from './make-delete-payment-repository'
import { DeletePaymentTypeORMRepository } from './delete-payment-repository'

describe('makeDeletePaymentRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockPaymentRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a DeletePaymentTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockPaymentRepository)
    const repo = await makeDeletePaymentRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(DeletePaymentTypeORMRepository)
  })
})

export {}
