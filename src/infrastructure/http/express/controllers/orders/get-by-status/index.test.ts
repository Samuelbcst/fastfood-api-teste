import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrderByStatus } from './index'
import * as factory from './make-order-get-by-status-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
  repository: undefined, // satisfy type
} as any // cast to any to ignore private property

describe('getOrderByStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetOrderByStatusFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case with correct status and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('orders!')
    const result = await getOrderByStatus({ status: 'RECEIVED' })
    expect(factory.makeGetOrderByStatusFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ status: 'RECEIVED' })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('orders!')
  })

  it('throws if status is missing', async () => {
    await expect(getOrderByStatus({})).rejects.toThrow('status is required')
    expect(factory.makeGetOrderByStatusFactory).not.toHaveBeenCalled()
  })
})
export {}
