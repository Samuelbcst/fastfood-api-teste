import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/client/delete-client/make-delete-client-use-case', () => ({
  makeDeleteClientUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/client/delete-client-repository/make-delete-client-repository', () => ({
  makeDeleteClientRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/client/delete-client-repository/make-delete-client-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/client/delete-client/make-delete-client-use-case'
import { makeDeleteClientFactory } from './make-client-delete-dependencies'

export {}

describe('makeDeleteClientFactory', () => {
  const mockRepository = { delete: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeDeleteClientRepository: ReturnType<typeof vi.fn>
  let mockedMakeDeleteClientUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeDeleteClientRepository = vi.mocked(repoModule.makeDeleteClientRepository)
    mockedMakeDeleteClientUseCase = vi.mocked(useCaseModule.makeDeleteClientUseCase)
    if (mockedMakeDeleteClientRepository.mock) mockedMakeDeleteClientRepository.mockReset()
    if (mockedMakeDeleteClientUseCase.mock) mockedMakeDeleteClientUseCase.mockReset()
    if (mockedMakeDeleteClientRepository.mock) mockedMakeDeleteClientRepository.mockResolvedValue(mockRepository)
    if (mockedMakeDeleteClientUseCase.mock) mockedMakeDeleteClientUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeDeleteClientFactory()
    expect(repoModule.makeDeleteClientRepository).toHaveBeenCalled()
    expect(useCaseModule.makeDeleteClientUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeDeleteClientRepository.mock) mockedMakeDeleteClientRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeDeleteClientFactory()).rejects.toThrow('repo fail')
  })
})
