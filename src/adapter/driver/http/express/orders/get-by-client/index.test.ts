import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrderByClient } from './index'
import * as factory from './make-order-get-by-client-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
  repository: undefined, // satisfy type
} as any // cast to any to ignore private property

describe('getOrderByClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetOrderByClientFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case with correct clientId and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('orders!')
    const result = await getOrderByClient({ clientId: '42' })
    expect(factory.makeGetOrderByClientFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ clientId: 42 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('orders!')
  })

  it('throws if clientId is not a number', async () => {
    await expect(getOrderByClient({ clientId: 'abc' })).rejects.toThrow('clientId must be a number')
    expect(factory.makeGetOrderByClientFactory).not.toHaveBeenCalled()
  })
})
export {}
