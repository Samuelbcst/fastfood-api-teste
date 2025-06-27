import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order/find-order-by-client/make-find-order-by-client-use-case', () => ({
  makeFindOrderByClientUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order/find-order-by-client-repository/make-find-order-by-client-repository', () => ({
  makeFindOrderByClientRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/order/find-order-by-client-repository/make-find-order-by-client-repository'
import * as useCaseModule from '../../../../../../application/use-cases/order/find-order-by-client/make-find-order-by-client-use-case'
import { makeGetOrderByClientFactory } from './make-order-get-by-client-dependencies'

export {}

describe('makeGetOrderByClientFactory', () => {
  const mockRepository = { findByClient: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindOrderByClientRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindOrderByClientUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindOrderByClientRepository = vi.mocked(repoModule.makeFindOrderByClientRepository)
    mockedMakeFindOrderByClientUseCase = vi.mocked(useCaseModule.makeFindOrderByClientUseCase)
    if (mockedMakeFindOrderByClientRepository.mock) mockedMakeFindOrderByClientRepository.mockReset()
    if (mockedMakeFindOrderByClientUseCase.mock) mockedMakeFindOrderByClientUseCase.mockReset()
    if (mockedMakeFindOrderByClientRepository.mock) mockedMakeFindOrderByClientRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindOrderByClientUseCase.mock) mockedMakeFindOrderByClientUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetOrderByClientFactory()
    expect(repoModule.makeFindOrderByClientRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindOrderByClientUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindOrderByClientRepository.mock) mockedMakeFindOrderByClientRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetOrderByClientFactory()).rejects.toThrow('repo fail')
  })
})

export {}
