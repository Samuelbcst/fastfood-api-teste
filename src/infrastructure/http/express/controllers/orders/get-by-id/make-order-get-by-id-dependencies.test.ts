import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order/find-order-by-id/make-find-order-by-id-use-case', () => ({
  makeFindOrderByIdUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order/find-order-by-id-repository/make-find-order-by-id-repository', () => ({
  makeFindOrderByIdRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/order/find-order-by-id-repository/make-find-order-by-id-repository'
import * as useCaseModule from '../../../../../../application/use-cases/order/find-order-by-id/make-find-order-by-id-use-case'
import { makeGetOrderByIdFactory } from './make-order-get-by-id-dependencies'

export {}

describe('makeGetOrderByIdFactory', () => {
  const mockRepository = { findById: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindOrderByIdRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindOrderByIdUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindOrderByIdRepository = vi.mocked(repoModule.makeFindOrderByIdRepository)
    mockedMakeFindOrderByIdUseCase = vi.mocked(useCaseModule.makeFindOrderByIdUseCase)
    if (mockedMakeFindOrderByIdRepository.mock) mockedMakeFindOrderByIdRepository.mockReset()
    if (mockedMakeFindOrderByIdUseCase.mock) mockedMakeFindOrderByIdUseCase.mockReset()
    if (mockedMakeFindOrderByIdRepository.mock) mockedMakeFindOrderByIdRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindOrderByIdUseCase.mock) mockedMakeFindOrderByIdUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetOrderByIdFactory()
    expect(repoModule.makeFindOrderByIdRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindOrderByIdUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindOrderByIdRepository.mock) mockedMakeFindOrderByIdRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetOrderByIdFactory()).rejects.toThrow('repo fail')
  })
})

export {}
