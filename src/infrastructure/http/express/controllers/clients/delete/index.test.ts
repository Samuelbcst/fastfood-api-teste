import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./make-client-delete-dependencies', () => ({ makeDeleteClientFactory: vi.fn() }))
import * as factoryModule from './make-client-delete-dependencies'
import { deleteClient } from './index'

describe('deleteClient', () => {
  const mockUseCase = {
    execute: vi.fn(),
    onFinish: vi.fn(),
    deleteClientRepository: {} as any
  }
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(factoryModule.makeDeleteClientFactory).mockResolvedValue(mockUseCase as any)
    mockUseCase.execute.mockResolvedValue('result')
    mockUseCase.onFinish.mockResolvedValue(undefined)
  })

  it('calls use case and returns result', async () => {
    const params = { id: '123' }
    const result = await deleteClient(params)
    expect(factoryModule.makeDeleteClientFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 123 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('result')
  })

  it('throws if id is not a number', async () => {
    await expect(deleteClient({ id: 'abc' })).rejects.toThrow('Id must be a number')
  })

  it('propagates errors from use case', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('fail'))
    await expect(deleteClient({ id: '1' })).rejects.toThrow('fail')
  })
})

export {}
