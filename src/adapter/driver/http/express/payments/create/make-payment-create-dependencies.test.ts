import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/payment/create-payment/make-create-payment-use-case', () => ({
  makeCreatePaymentUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/payment/create-payment-repository/make-create-payment-repository', () => ({
  makeCreatePaymentRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/payment/create-payment-repository/make-create-payment-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/payment/create-payment/make-create-payment-use-case'
import { makeCreatePaymentFactory } from './make-payment-create-dependencies'

export {}

describe('makeCreatePaymentFactory', () => {
  const mockRepository = { create: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeCreatePaymentRepository: ReturnType<typeof vi.fn>
  let mockedMakeCreatePaymentUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeCreatePaymentRepository = vi.mocked(repoModule.makeCreatePaymentRepository)
    mockedMakeCreatePaymentUseCase = vi.mocked(useCaseModule.makeCreatePaymentUseCase)
    if (mockedMakeCreatePaymentRepository.mock) mockedMakeCreatePaymentRepository.mockReset()
    if (mockedMakeCreatePaymentUseCase.mock) mockedMakeCreatePaymentUseCase.mockReset()
    if (mockedMakeCreatePaymentRepository.mock) mockedMakeCreatePaymentRepository.mockResolvedValue(mockRepository)
    if (mockedMakeCreatePaymentUseCase.mock) mockedMakeCreatePaymentUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeCreatePaymentFactory()
    expect(repoModule.makeCreatePaymentRepository).toHaveBeenCalled()
    expect(useCaseModule.makeCreatePaymentUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeCreatePaymentRepository.mock) mockedMakeCreatePaymentRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeCreatePaymentFactory()).rejects.toThrow('repo fail')
  })
})

export {}
