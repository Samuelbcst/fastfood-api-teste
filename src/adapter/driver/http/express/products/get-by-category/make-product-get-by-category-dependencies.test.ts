import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/product/find-product-by-category', () => ({
  FindProductByCategoryUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/product/find-product-by-category-repository/make-find-product-by-category-repository', () => ({
  makeFindProductByCategoryRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/product/find-product-by-category-repository/make-find-product-by-category-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/product/find-product-by-category'
import { makeGetProductByCategoryFactory } from './make-product-get-by-category-dependencies'

describe('makeGetProductByCategoryFactory', () => {
  const mockRepository = { findByCategory: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindProductByCategoryRepository: ReturnType<typeof vi.fn>
  let MockedFindProductByCategoryUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindProductByCategoryRepository = vi.mocked(repoModule.makeFindProductByCategoryRepository)
    MockedFindProductByCategoryUseCase = vi.mocked(useCaseModule.FindProductByCategoryUseCase)
    if (mockedMakeFindProductByCategoryRepository.mock) mockedMakeFindProductByCategoryRepository.mockReset()
    if (MockedFindProductByCategoryUseCase.mock) MockedFindProductByCategoryUseCase.mockReset()
    if (mockedMakeFindProductByCategoryRepository.mock) mockedMakeFindProductByCategoryRepository.mockResolvedValue(mockRepository)
    if (MockedFindProductByCategoryUseCase.mock) MockedFindProductByCategoryUseCase.mockImplementation(() => mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetProductByCategoryFactory()
    expect(repoModule.makeFindProductByCategoryRepository).toHaveBeenCalled()
    expect(useCaseModule.FindProductByCategoryUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindProductByCategoryRepository.mock) mockedMakeFindProductByCategoryRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetProductByCategoryFactory()).rejects.toThrow('repo fail')
  })
})
export {}
