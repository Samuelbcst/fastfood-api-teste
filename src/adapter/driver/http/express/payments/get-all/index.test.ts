import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPaymentAll } from './index'
import * as factory from './make-payment-get-all-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('getPaymentAll', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetPaymentAllFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case and returns result', async () => {
    mockUseCase.execute.mockResolvedValue(['payment1', 'payment2'])
    const result = await getPaymentAll()
    expect(factory.makeGetPaymentAllFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalled()
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toEqual(['payment1', 'payment2'])
  })
})
export {}
