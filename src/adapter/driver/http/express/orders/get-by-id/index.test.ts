import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrderById } from './index'
import * as factory from './make-order-get-by-id-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
  repository: undefined, // satisfy type
} as any // cast to any to ignore private property

describe('getOrderById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetOrderByIdFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case with correct id and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('order!')
    const result = await getOrderById({ id: '123' })
    expect(factory.makeGetOrderByIdFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 123 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('order!')
  })

  it('throws if id is not a number', async () => {
    await expect(getOrderById({ id: 'abc' })).rejects.toThrow('Id must be a number')
    expect(factory.makeGetOrderByIdFactory).not.toHaveBeenCalled()
  })
})
export {}
