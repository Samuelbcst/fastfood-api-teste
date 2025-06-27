import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order-item/delete-order-item/make-delete-order-item-use-case', () => ({
  makeDeleteOrderItemUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order-item/delete-order-item-repository/make-delete-order-item-repository', () => ({
  makeDeleteOrderItemRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/order-item/delete-order-item-repository/make-delete-order-item-repository'
import * as useCaseModule from '../../../../../../application/use-cases/order-item/delete-order-item/make-delete-order-item-use-case'
import { makeDeleteOrderItemFactory } from './make-order-item-delete-dependencies'

export {}

describe('makeDeleteOrderItemFactory', () => {
  const mockRepository = { delete: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeDeleteOrderItemRepository: ReturnType<typeof vi.fn>
  let mockedMakeDeleteOrderItemUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeDeleteOrderItemRepository = vi.mocked(repoModule.makeDeleteOrderItemRepository)
    mockedMakeDeleteOrderItemUseCase = vi.mocked(useCaseModule.makeDeleteOrderItemUseCase)
    if (mockedMakeDeleteOrderItemRepository.mock) mockedMakeDeleteOrderItemRepository.mockReset()
    if (mockedMakeDeleteOrderItemUseCase.mock) mockedMakeDeleteOrderItemUseCase.mockReset()
    if (mockedMakeDeleteOrderItemRepository.mock) mockedMakeDeleteOrderItemRepository.mockResolvedValue(mockRepository)
    if (mockedMakeDeleteOrderItemUseCase.mock) mockedMakeDeleteOrderItemUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeDeleteOrderItemFactory()
    expect(repoModule.makeDeleteOrderItemRepository).toHaveBeenCalled()
    expect(useCaseModule.makeDeleteOrderItemUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeDeleteOrderItemRepository.mock) mockedMakeDeleteOrderItemRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeDeleteOrderItemFactory()).rejects.toThrow('repo fail')
  })
})

export {}
