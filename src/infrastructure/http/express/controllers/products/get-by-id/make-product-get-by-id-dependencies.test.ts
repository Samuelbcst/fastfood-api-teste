import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/product/find-product-by-id/make-find-product-by-id-use-case', () => ({
  makeFindProductByIdUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/product/find-product-by-id-repository/make-find-product-by-id-repository', () => ({
  makeFindProductByIdRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/product/find-product-by-id-repository/make-find-product-by-id-repository'
import * as useCaseModule from '../../../../../../application/use-cases/product/find-product-by-id/make-find-product-by-id-use-case'
import { makeGetProductByIdFactory } from './make-product-get-by-id-dependencies'

describe('makeGetProductByIdFactory', () => {
  const mockRepository = { findById: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeFindProductByIdRepository: ReturnType<typeof vi.fn>
  let mockedMakeFindProductByIdUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeFindProductByIdRepository = vi.mocked(repoModule.makeFindProductByIdRepository)
    mockedMakeFindProductByIdUseCase = vi.mocked(useCaseModule.makeFindProductByIdUseCase)
    if (mockedMakeFindProductByIdRepository.mock) mockedMakeFindProductByIdRepository.mockReset()
    if (mockedMakeFindProductByIdUseCase.mock) mockedMakeFindProductByIdUseCase.mockReset()
    if (mockedMakeFindProductByIdRepository.mock) mockedMakeFindProductByIdRepository.mockResolvedValue(mockRepository)
    if (mockedMakeFindProductByIdUseCase.mock) mockedMakeFindProductByIdUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeGetProductByIdFactory()
    expect(repoModule.makeFindProductByIdRepository).toHaveBeenCalled()
    expect(useCaseModule.makeFindProductByIdUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeFindProductByIdRepository.mock) mockedMakeFindProductByIdRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeGetProductByIdFactory()).rejects.toThrow('repo fail')
  })
})
export {}
