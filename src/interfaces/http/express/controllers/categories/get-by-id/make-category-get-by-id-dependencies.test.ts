import { describe, it, expect, vi, beforeEach } from 'vitest'

// Hoist mocks for both dependencies
vi.mock('../../../../../../core/application/use-case/category/find-category-by-id/make-find-category-by-id-use-case', () => ({
  makeFindCategoryByIdUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/category/find-category-by-id-repository/make-find-category-by-id-repository', () => ({
  makeFindCategoryByIdRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/category/find-category-by-id-repository/make-find-category-by-id-repository'
import * as useCaseModule from '../../../../../../application/use-cases/category/find-category-by-id/make-find-category-by-id-use-case'
import { makeGetCategoryByIdFactory } from './make-category-get-by-id-dependencies'

export {}

describe('makeGetCategoryByIdFactory', () => {
  const mockRepository = { findById: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindCategoryByIdRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindCategoryByIdUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindCategoryByIdRepository = vi.mocked(repoModule.makeFindCategoryByIdRepository)
    mockedMakeFindCategoryByIdUseCase = vi.mocked(useCaseModule.makeFindCategoryByIdUseCase)
    if (mockedMakeFindCategoryByIdRepository.mock) mockedMakeFindCategoryByIdRepository.mockReset()
    if (mockedMakeFindCategoryByIdUseCase.mock) mockedMakeFindCategoryByIdUseCase.mockReset()
    if (mockedMakeFindCategoryByIdRepository.mock) mockedMakeFindCategoryByIdRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindCategoryByIdUseCase.mock) mockedMakeFindCategoryByIdUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetCategoryByIdFactory()
    expect(repoModule.makeFindCategoryByIdRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindCategoryByIdUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindCategoryByIdRepository.mock) mockedMakeFindCategoryByIdRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetCategoryByIdFactory()).rejects.toThrow('repo fail')
  })
})

export {}
