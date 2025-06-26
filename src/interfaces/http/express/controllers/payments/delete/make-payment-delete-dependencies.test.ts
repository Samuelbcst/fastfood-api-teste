import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/payment/delete-payment/make-delete-payment-use-case', () => ({
  makeDeletePaymentUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/payment/delete-payment-repository/make-delete-payment-repository', () => ({
  makeDeletePaymentRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/payment/delete-payment-repository/make-delete-payment-repository'
import * as useCaseModule from '../../../../../../application/use-cases/payment/delete-payment/make-delete-payment-use-case'
import { makeDeletePaymentFactory } from './make-payment-delete-dependencies'

export {}

describe('makeDeletePaymentFactory', () => {
  const mockRepository = { delete: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeDeletePaymentRepository: ReturnType<typeof vi.fn>
  let mockedMakeDeletePaymentUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeDeletePaymentRepository = vi.mocked(repoModule.makeDeletePaymentRepository)
    mockedMakeDeletePaymentUseCase = vi.mocked(useCaseModule.makeDeletePaymentUseCase)
    if (mockedMakeDeletePaymentRepository.mock) mockedMakeDeletePaymentRepository.mockReset()
    if (mockedMakeDeletePaymentUseCase.mock) mockedMakeDeletePaymentUseCase.mockReset()
    if (mockedMakeDeletePaymentRepository.mock) mockedMakeDeletePaymentRepository.mockResolvedValue(mockRepository)
    if (mockedMakeDeletePaymentUseCase.mock) mockedMakeDeletePaymentUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeDeletePaymentFactory()
    expect(repoModule.makeDeletePaymentRepository).toHaveBeenCalled()
    expect(useCaseModule.makeDeletePaymentUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeDeletePaymentRepository.mock) mockedMakeDeletePaymentRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeDeletePaymentFactory()).rejects.toThrow('repo fail')
  })
})

export {}
