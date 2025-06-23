import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOrderAll } from './index'
import * as factory from './make-order-get-all-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
  repository: undefined, // satisfy type
} as any // cast to any to ignore private property

describe('getOrderAll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetOrderAllFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case and returns result', async () => {
    mockUseCase.execute.mockResolvedValue(['order1', 'order2'])
    const result = await getOrderAll()
    expect(factory.makeGetOrderAllFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalled()
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toEqual(['order1', 'order2'])
  })
})
export {}
