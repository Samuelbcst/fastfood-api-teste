import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order-item/create-order-item/make-create-order-item-use-case', () => ({
  makeCreateOrderItemUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order-item/create-order-item-repository/make-create-order-item-repository', () => ({
  makeCreateOrderItemRepository: vi.fn()
}))

import * as repoModule from '../../../../../../infrastructure/database/typeorm/order-item/create-order-item-repository/make-create-order-item-repository'
import * as useCaseModule from '../../../../../../application/use-cases/order-item/create-order-item/make-create-order-item-use-case'
import { makeCreateOrderItemFactory } from './make-order-item-create-dependencies'

export {}

describe('makeCreateOrderItemFactory', () => {
  const mockRepository = { create: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeCreateOrderItemRepository: ReturnType<typeof vi.fn>
  let mockedMakeCreateOrderItemUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeCreateOrderItemRepository = vi.mocked(repoModule.makeCreateOrderItemRepository)
    mockedMakeCreateOrderItemUseCase = vi.mocked(useCaseModule.makeCreateOrderItemUseCase)
    if (mockedMakeCreateOrderItemRepository.mock) mockedMakeCreateOrderItemRepository.mockReset()
    if (mockedMakeCreateOrderItemUseCase.mock) mockedMakeCreateOrderItemUseCase.mockReset()
    if (mockedMakeCreateOrderItemRepository.mock) mockedMakeCreateOrderItemRepository.mockResolvedValue(mockRepository)
    if (mockedMakeCreateOrderItemUseCase.mock) mockedMakeCreateOrderItemUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeCreateOrderItemFactory()
    expect(repoModule.makeCreateOrderItemRepository).toHaveBeenCalled()
    expect(useCaseModule.makeCreateOrderItemUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeCreateOrderItemRepository.mock) mockedMakeCreateOrderItemRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeCreateOrderItemFactory()).rejects.toThrow('repo fail')
  })
})

export {}
