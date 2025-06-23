import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getPaymentById } from './index'
import * as factory from './make-payment-get-by-id-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('getPaymentById', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeGetPaymentByIdFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case with correct id and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('payment!')
    const result = await getPaymentById({ id: '123' })
    expect(factory.makeGetPaymentByIdFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 123 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('payment!')
  })

  it('throws if id is not a number', async () => {
    await expect(getPaymentById({ id: 'abc' })).rejects.toThrow('Id must be a number')
    expect(factory.makeGetPaymentByIdFactory).not.toHaveBeenCalled()
  })
})
export {}
