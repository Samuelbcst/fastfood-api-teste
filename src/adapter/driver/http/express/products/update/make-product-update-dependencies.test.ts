import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/product/update-product/make-update-product-use-case', () => ({
  makeUpdateProductUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/product/update-product-repository/make-update-product-repository', () => ({
  makeUpdateProductRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/product/update-product-repository/make-update-product-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/product/update-product/make-update-product-use-case'
import { makeUpdateProductFactory } from './make-product-update-dependencies'

describe('makeUpdateProductFactory', () => {
  const mockRepository = { update: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeUpdateProductRepository: ReturnType<typeof vi.fn>
  let mockedMakeUpdateProductUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeUpdateProductRepository = vi.mocked(repoModule.makeUpdateProductRepository)
    mockedMakeUpdateProductUseCase = vi.mocked(useCaseModule.makeUpdateProductUseCase)
    if (mockedMakeUpdateProductRepository.mock) mockedMakeUpdateProductRepository.mockReset()
    if (mockedMakeUpdateProductUseCase.mock) mockedMakeUpdateProductUseCase.mockReset()
    if (mockedMakeUpdateProductRepository.mock) mockedMakeUpdateProductRepository.mockResolvedValue(mockRepository)
    if (mockedMakeUpdateProductUseCase.mock) mockedMakeUpdateProductUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeUpdateProductFactory()
    expect(repoModule.makeUpdateProductRepository).toHaveBeenCalled()
    expect(useCaseModule.makeUpdateProductUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeUpdateProductRepository.mock) mockedMakeUpdateProductRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeUpdateProductFactory()).rejects.toThrow('repo fail')
  })
})
export {}
