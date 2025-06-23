import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createProduct } from './index'
import * as makeProductFactory from './make-product-create-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('createProduct', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(makeProductFactory, 'makeCreateProductFactory').mockResolvedValue(mockUseCase)
  })

  it('creates product with valid input and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('product-result')
    const body = { name: 'Test', description: 'desc', price: 10, categoryId: 1, active: true }
    const result = await createProduct({}, body)
    expect(makeProductFactory.makeCreateProductFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ name: 'Test', description: 'desc', price: 10, categoryId: 1, active: true })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('product-result')
  })

  it('throws if input is invalid', async () => {
    await expect(createProduct({}, { name: '', price: -1, categoryId: 'bad' })).rejects.toThrow()
    expect(makeProductFactory.makeCreateProductFactory).not.toHaveBeenCalled()
  })
})
export {}
