import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/client/find-client-by-id/make-find-client-by-id-use-case', () => ({
  makeFindClientByIdUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/client/find-client-by-id-repository/make-find-client-by-id-repository', () => ({
  makeFindClientByIdRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/client/find-client-by-id-repository/make-find-client-by-id-repository'
import * as useCaseModule from '../../../../../../application/use-cases/client/find-client-by-id/make-find-client-by-id-use-case'
import { makeGetClientByIdFactory } from './make-client-get-by-id-dependencies'

export {}

describe('makeGetClientByIdFactory', () => {
  const mockRepository = { findById: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindClientByIdRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindClientByIdUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindClientByIdRepository = vi.mocked(repoModule.makeFindClientByIdRepository)
    mockedMakeFindClientByIdUseCase = vi.mocked(useCaseModule.makeFindClientByIdUseCase)
    if (mockedMakeFindClientByIdRepository.mock) mockedMakeFindClientByIdRepository.mockReset()
    if (mockedMakeFindClientByIdUseCase.mock) mockedMakeFindClientByIdUseCase.mockReset()
    if (mockedMakeFindClientByIdRepository.mock) mockedMakeFindClientByIdRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindClientByIdUseCase.mock) mockedMakeFindClientByIdUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetClientByIdFactory()
    expect(repoModule.makeFindClientByIdRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindClientByIdUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindClientByIdRepository.mock) mockedMakeFindClientByIdRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetClientByIdFactory()).rejects.toThrow('repo fail')
  })
})
