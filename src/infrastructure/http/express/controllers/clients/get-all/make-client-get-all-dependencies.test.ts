import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/client/find-client-all/make-find-client-all-use-case', () => ({
  makeFindClientAllUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/client/find-client-all-repository/make-find-client-all-repository', () => ({
  makeFindClientAllRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/client/find-client-all-repository/make-find-client-all-repository'
import * as useCaseModule from '../../../../../../application/use-cases/client/find-client-all/make-find-client-all-use-case'
import { makeGetClientAllFactory } from './make-client-get-all-dependencies'

export {}

describe('makeGetClientAllFactory', () => {
  const mockRepository = { findAll: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindClientAllRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindClientAllUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindClientAllRepository = vi.mocked(repoModule.makeFindClientAllRepository)
    mockedMakeFindClientAllUseCase = vi.mocked(useCaseModule.makeFindClientAllUseCase)
    if (mockedMakeFindClientAllRepository.mock) mockedMakeFindClientAllRepository.mockReset()
    if (mockedMakeFindClientAllUseCase.mock) mockedMakeFindClientAllUseCase.mockReset()
    if (mockedMakeFindClientAllRepository.mock) mockedMakeFindClientAllRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindClientAllUseCase.mock) mockedMakeFindClientAllUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetClientAllFactory()
    expect(repoModule.makeFindClientAllRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindClientAllUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindClientAllRepository.mock) mockedMakeFindClientAllRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetClientAllFactory()).rejects.toThrow('repo fail')
  })
})
