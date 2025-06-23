vi.mock('../model', () => ({
  PaymentModel: class {}
}))
vi.mock('../../', () => ({
  default: {
    get initialize() { return mockInitialize },
    get getRepository() { return mockGetRepository }
  }
}))

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeCreatePaymentRepository } from './make-create-payment-repository'
import { TypeOrmCreatePaymentRepository } from './create-payment-repository'

let mockInitialize: any
let mockGetRepository: any
let mockPaymentRepository: any

describe('makeCreatePaymentRepository', () => {
  beforeEach(() => {
    mockInitialize = vi.fn()
    mockGetRepository = vi.fn()
    mockPaymentRepository = {}
    mockInitialize.mockReset()
    mockGetRepository.mockReset()
  })

  it('should initialize dataSource and return a TypeOrmCreatePaymentRepository', async () => {
    mockInitialize.mockResolvedValue(undefined)
    mockGetRepository.mockReturnValue(mockPaymentRepository)
    const repo = await makeCreatePaymentRepository()
    expect(mockInitialize).toHaveBeenCalled()
    expect(mockGetRepository).toHaveBeenCalled()
    expect(repo).toBeInstanceOf(TypeOrmCreatePaymentRepository)
  })
})

export {}
