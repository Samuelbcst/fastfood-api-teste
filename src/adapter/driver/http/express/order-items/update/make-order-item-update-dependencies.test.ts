import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../../../../core/application/use-case/order-item/update-order-item/make-update-order-item-use-case', () => ({
  makeUpdateOrderItemUseCase: vi.fn()
}))
vi.mock('../../../../../driven/persistence/typeorm/order-item/update-order-item-repository/make-update-order-item-repository', () => ({
  makeUpdateOrderItemRepository: vi.fn()
}))

import * as repoModule from '../../../../../driven/persistence/typeorm/order-item/update-order-item-repository/make-update-order-item-repository'
import * as useCaseModule from '../../../../../../core/application/use-case/order-item/update-order-item/make-update-order-item-use-case'
import { makeUpdateOrderItemFactory } from './make-order-item-update-dependencies'

export {}

describe('makeUpdateOrderItemFactory', () => {
  const mockRepository = { update: vi.fn() }
  const mockUseCase = { execute: vi.fn(), onFinish: vi.fn() }
  let mockedMakeUpdateOrderItemRepository: ReturnType<typeof vi.fn>
  let mockedMakeUpdateOrderItemUseCase: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockedMakeUpdateOrderItemRepository = vi.mocked(repoModule.makeUpdateOrderItemRepository)
    mockedMakeUpdateOrderItemUseCase = vi.mocked(useCaseModule.makeUpdateOrderItemUseCase)
    if (mockedMakeUpdateOrderItemRepository.mock) mockedMakeUpdateOrderItemRepository.mockReset()
    if (mockedMakeUpdateOrderItemUseCase.mock) mockedMakeUpdateOrderItemUseCase.mockReset()
    if (mockedMakeUpdateOrderItemRepository.mock) mockedMakeUpdateOrderItemRepository.mockResolvedValue(mockRepository)
    if (mockedMakeUpdateOrderItemUseCase.mock) mockedMakeUpdateOrderItemUseCase.mockReturnValue(mockUseCase)
  })

  it('creates use case with repository and returns it', async () => {
    const result = await makeUpdateOrderItemFactory()
    expect(repoModule.makeUpdateOrderItemRepository).toHaveBeenCalled()
    expect(useCaseModule.makeUpdateOrderItemUseCase).toHaveBeenCalledWith(mockRepository)
    expect(result).toBe(mockUseCase)
  })

  it('propagates errors from repository', async () => {
    if (mockedMakeUpdateOrderItemRepository.mock) mockedMakeUpdateOrderItemRepository.mockRejectedValue(new Error('repo fail'))
    await expect(makeUpdateOrderItemFactory()).rejects.toThrow('repo fail')
  })
})

export {}
