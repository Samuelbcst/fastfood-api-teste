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
import { makeFindPaymentAllRepository } from './make-find-payment-all-repository'
import { FindPaymentAllTypeORMRepository } from './find-payment-all-repository'

describe('makeFindPaymentAllRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockPaymentRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a FindPaymentAllTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockPaymentRepository)
    const repo = await makeFindPaymentAllRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(FindPaymentAllTypeORMRepository)
  })
})

export {}
