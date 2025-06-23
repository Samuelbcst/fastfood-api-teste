import { describe, it, expect, vi, beforeEach } from 'vitest'
import { updatePayment } from './index'
import * as factory from './make-payment-update-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('updatePayment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeUpdatePaymentFactory').mockResolvedValue(mockUseCase)
  })

  it('updates payment with valid input and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('payment-result')
    const params = { id: '1' }
    const body = { paymentStatus: 'PAID' }
    const result = await updatePayment(params, body)
    expect(factory.makeUpdatePaymentFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 1, status: 'PAID' })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('payment-result')
  })

  it('updates payment with only id', async () => {
    mockUseCase.execute.mockResolvedValue('payment-result')
    const params = { id: '1' }
    const body = {}
    const result = await updatePayment(params, body)
    expect(factory.makeUpdatePaymentFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 1, status: undefined })
    expect(result).toBe('payment-result')
  })

  it('throws if id is not a number', async () => {
    await expect(updatePayment({ id: 'abc' }, {})).rejects.toThrow('Id must be a number')
    expect(factory.makeUpdatePaymentFactory).not.toHaveBeenCalled()
  })
})
export {}
