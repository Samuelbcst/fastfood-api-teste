import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProductAll } from './index'
import * as makeGetProductAllFactory from './make-product-get-all-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('getProductAll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(makeGetProductAllFactory, 'makeGetProductAllFactory').mockResolvedValue(mockUseCase)
  })

  it('gets all products', async () => {
    mockUseCase.execute.mockResolvedValue(['product1', 'product2'])
    const result = await getProductAll()
    expect(makeGetProductAllFactory.makeGetProductAllFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalled()
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toEqual(['product1', 'product2'])
  })
})
export {}
