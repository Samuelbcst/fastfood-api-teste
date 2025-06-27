import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/client/update-client/make-update-client-use-case', () => ({
  makeUpdateClientUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/client/update-client-repository/make-update-client-repository', () => ({
  makeUpdateClientRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/client/update-client-repository/make-update-client-repository'
import * as useCaseModule from '../../../../../../application/use-cases/client/update-client/make-update-client-use-case'
import { makeUpdateClientFactory } from './make-client-update-dependencies'

export {}

describe('makeUpdateClientFactory', () => {
  const mockRepository = { update: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeUpdateClientRepository: ReturnType<typeof vi.fn>
  let mockedMakeUpdateClientUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeUpdateClientRepository = vi.mocked(repoModule.makeUpdateClientRepository)
    mockedMakeUpdateClientUseCase = vi.mocked(useCaseModule.makeUpdateClientUseCase)
    if (mockedMakeUpdateClientRepository.mock) mockedMakeUpdateClientRepository.mockReset()
    if (mockedMakeUpdateClientUseCase.mock) mockedMakeUpdateClientUseCase.mockReset()
    if (mockedMakeUpdateClientRepository.mock) mockedMakeUpdateClientRepository.mockResolvedValue(mockRepository)
    if (mockedMakeUpdateClientUseCase.mock) mockedMakeUpdateClientUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeUpdateClientFactory()
    expect(repoModule.makeUpdateClientRepository).toHaveBeenCalled()
    expect(useCaseModule.makeUpdateClientUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeUpdateClientRepository.mock) mockedMakeUpdateClientRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeUpdateClientFactory()).rejects.toThrow('repo fail')
  })
})
