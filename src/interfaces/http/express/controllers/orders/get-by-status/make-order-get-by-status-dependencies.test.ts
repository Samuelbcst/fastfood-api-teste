import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order/find-order-by-status/make-find-order-by-status-use-case', () => ({
  makeFindOrderByStatusUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order/find-order-by-status-repository/make-find-order-by-status-repository', () => ({
  makeFindOrderByStatusRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/order/find-order-by-status-repository/make-find-order-by-status-repository'
import * as useCaseModule from '../../../../../../application/use-cases/order/find-order-by-status/make-find-order-by-status-use-case'
import { makeGetOrderByStatusFactory } from './make-order-get-by-status-dependencies'

export {}

describe('makeGetOrderByStatusFactory', () => {
  const mockRepository = { findByStatus: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindOrderByStatusRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindOrderByStatusUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindOrderByStatusRepository = vi.mocked(repoModule.makeFindOrderByStatusRepository)
    mockedMakeFindOrderByStatusUseCase = vi.mocked(useCaseModule.makeFindOrderByStatusUseCase)
    if (mockedMakeFindOrderByStatusRepository.mock) mockedMakeFindOrderByStatusRepository.mockReset()
    if (mockedMakeFindOrderByStatusUseCase.mock) mockedMakeFindOrderByStatusUseCase.mockReset()
    if (mockedMakeFindOrderByStatusRepository.mock) mockedMakeFindOrderByStatusRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindOrderByStatusUseCase.mock) mockedMakeFindOrderByStatusUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetOrderByStatusFactory()
    expect(repoModule.makeFindOrderByStatusRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindOrderByStatusUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindOrderByStatusRepository.mock) mockedMakeFindOrderByStatusRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetOrderByStatusFactory()).rejects.toThrow('repo fail')
  })
})

export {}
