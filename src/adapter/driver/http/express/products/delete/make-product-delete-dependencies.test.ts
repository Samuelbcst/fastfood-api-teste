import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/product/delete-product/make-delete-product-use-case', () => ({
  makeDeleteProductUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/product/delete-product-repository/make-delete-product-repository', () => ({
  makeDeleteProductRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/product/delete-product-repository/make-delete-product-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/product/delete-product/make-delete-product-use-case'
import { makeDeleteProductFactory } from './make-product-delete-dependencies'

describe('makeDeleteProductFactory', () => {
  const mockRepository = { delete: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeDeleteProductRepository: ReturnType<typeof vi.fn>
  let mockedMakeDeleteProductUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeDeleteProductRepository = vi.mocked(repoModule.makeDeleteProductRepository)
    mockedMakeDeleteProductUseCase = vi.mocked(useCaseModule.makeDeleteProductUseCase)
    if (mockedMakeDeleteProductRepository.mock) mockedMakeDeleteProductRepository.mockReset()
    if (mockedMakeDeleteProductUseCase.mock) mockedMakeDeleteProductUseCase.mockReset()
    if (mockedMakeDeleteProductRepository.mock) mockedMakeDeleteProductRepository.mockResolvedValue(mockRepository)
    if (mockedMakeDeleteProductUseCase.mock) mockedMakeDeleteProductUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeDeleteProductFactory()
    expect(repoModule.makeDeleteProductRepository).toHaveBeenCalled()
    expect(useCaseModule.makeDeleteProductUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeDeleteProductRepository.mock) mockedMakeDeleteProductRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeDeleteProductFactory()).rejects.toThrow('repo fail')
  })
})
export {}
