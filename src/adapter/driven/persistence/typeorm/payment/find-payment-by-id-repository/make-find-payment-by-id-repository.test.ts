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
import { makeFindPaymentByIdRepository } from './make-find-payment-by-id-repository'
import { FindPaymentByIdTypeORMRepository } from './find-payment-by-id-repository'

describe('makeFindPaymentByIdRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockPaymentRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a FindPaymentByIdTypeORMRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockPaymentRepository)
    const repo = await makeFindPaymentByIdRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(FindPaymentByIdTypeORMRepository)
  })
})

export {}
