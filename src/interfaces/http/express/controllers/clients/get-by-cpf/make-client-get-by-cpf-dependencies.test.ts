import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/client/find-client-by-cpf', () => ({
  FindClientByCpfUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/client/find-client-by-cpf-repository/make-find-client-by-cpf-repository', () => ({
  makeFindClientByCpfRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/client/find-client-by-cpf-repository/make-find-client-by-cpf-repository'
import * as useCaseModule from '../../../../../../application/use-cases/client/find-client-by-cpf'
import { makeGetClientByCpfFactory } from './make-client-get-by-cpf-dependencies'

export {}

describe('makeGetClientByCpfFactory', () => {
  const mockRepository = { findByCpf: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindClientByCpfRepository: ReturnType<typeof vi.fn>
  let mockedFindClientByCpfUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindClientByCpfRepository = vi.mocked(repoModule.makeFindClientByCpfRepository)
    mockedFindClientByCpfUseCase = vi.mocked(useCaseModule.FindClientByCpfUseCase)
    if (mockedMakeFindClientByCpfRepository.mock) mockedMakeFindClientByCpfRepository.mockReset()
    if (mockedFindClientByCpfUseCase.mock) mockedFindClientByCpfUseCase.mockReset()
    if (mockedMakeFindClientByCpfRepository.mock) mockedMakeFindClientByCpfRepository.mockResolvedValue(mockRepository)
    if (mockedFindClientByCpfUseCase.mock) mockedFindClientByCpfUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetClientByCpfFactory()
    expect(repoModule.makeFindClientByCpfRepository).toHaveBeenCalled()
    expect(useCaseModule.FindClientByCpfUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindClientByCpfRepository.mock) mockedMakeFindClientByCpfRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetClientByCpfFactory()).rejects.toThrow('repo fail')
  })
})
