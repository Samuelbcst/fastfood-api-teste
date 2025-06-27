import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeCreateClientFactory } from './make-client-create-dependencies'

vi.mock('../../../../../driven/persistence/typeorm/client/create-client-repository/make-create-client-repository', () => ({
  makeCreateClientRepository: vi.fn()
}))
vi.mock('../../../../../../core/application/use-case/client/create-client/make-create-client-use-case', () => ({
  makeCreateClientUseCase: vi.fn()
}))

import { makeCreateClientRepository } from '../../../../../../infrastructure/database/typeorm/client/create-client-repository/make-create-client-repository'
import { makeCreateClientUseCase } from '../../../../../../application/use-cases/client/create-client/make-create-client-use-case'

describe('makeCreateClientFactory', () => {
  const mockRepository = { repo: true }
  const mockUseCase = { use: true }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(makeCreateClientRepository).mockResolvedValue(mockRepository as any)
    vi.mocked(makeCreateClientUseCase).mockReturnValue(mockUseCase as any)
  })

  it('should create use case with repository', async () => {
    const result = await makeCreateClientFactory()
    expect(makeCreateClientRepository).toHaveBeenCalled()
    expect(makeCreateClientUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })
})
