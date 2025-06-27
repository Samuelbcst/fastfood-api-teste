import { describe, it, expect, vi, beforeEach } from 'vitest'

// Hoist mocks for both dependencies
vi.mock('../../../../../../core/application/use-case/category/update-category/make-update-category-use-case', () => ({
  makeUpdateCategoryUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/category/update-category-repository/make-update-category-repository', () => ({
  makeUpdateCategoryRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/category/update-category-repository/make-update-category-repository'
import * as useCaseModule from '../../../../../../application/use-cases/category/update-category/make-update-category-use-case'
import { makeUpdateCategoryFactory } from './make-category-update-dependencies'

export {}

describe('makeUpdateCategoryFactory', () => {
  const mockRepository = { update: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeUpdateCategoryRepository: ReturnType<typeof vi.fn>
  let mockedMakeUpdateCategoryUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeUpdateCategoryRepository = vi.mocked(repoModule.makeUpdateCategoryRepository)
    mockedMakeUpdateCategoryUseCase = vi.mocked(useCaseModule.makeUpdateCategoryUseCase)
    if (mockedMakeUpdateCategoryRepository.mock) mockedMakeUpdateCategoryRepository.mockReset()
    if (mockedMakeUpdateCategoryUseCase.mock) mockedMakeUpdateCategoryUseCase.mockReset()
    if (mockedMakeUpdateCategoryRepository.mock) mockedMakeUpdateCategoryRepository.mockResolvedValue(mockRepository)
    if (mockedMakeUpdateCategoryUseCase.mock) mockedMakeUpdateCategoryUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeUpdateCategoryFactory()
    expect(repoModule.makeUpdateCategoryRepository).toHaveBeenCalled()
    expect(useCaseModule.makeUpdateCategoryUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeUpdateCategoryRepository.mock) mockedMakeUpdateCategoryRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeUpdateCategoryFactory()).rejects.toThrow('repo fail')
  })
})

export {}
