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
import { makeUpdatePaymentRepository } from './make-update-payment-repository'
import { UpdatePaymentTypeORMRepository } from './update-payment-repository'

describe('makeUpdatePaymentRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockPaymentRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return an UpdatePaymentTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockPaymentRepository)
    const repo = await makeUpdatePaymentRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(UpdatePaymentTypeORMRepository)
  })
})

export {}
