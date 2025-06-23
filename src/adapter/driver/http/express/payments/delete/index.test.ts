import { describe, it, expect, vi, beforeEach } from 'vitest'
import { deletePayment } from './index'
import * as factory from './make-payment-delete-dependencies'

const mockUseCase = {
  execute: vi.fn(),
  onFinish: vi.fn(),
} as any

describe('deletePayment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(factory, 'makeDeletePaymentFactory').mockResolvedValue(mockUseCase)
  })

  it('calls use case with correct id and returns result', async () => {
    mockUseCase.execute.mockResolvedValue('deleted!')
    const result = await deletePayment({ id: '123' })
    expect(factory.makeDeletePaymentFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 123 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('deleted!')
  })

  it('throws if id is not a number', async () => {
    await expect(deletePayment({ id: 'abc' })).rejects.toThrow('Id must be a number')
    expect(factory.makeDeletePaymentFactory).not.toHaveBeenCalled()
  })
})
export {}
