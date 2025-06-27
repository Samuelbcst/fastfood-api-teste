import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./make-client-get-by-id-dependencies', () => ({ makeGetClientByIdFactory: vi.fn() }))
import * as factoryModule from './make-client-get-by-id-dependencies'
import { getClientById } from './index'

describe('getClientById', () => {
  const mockUseCase = {
    execute: vi.fn(),
    onFinish: vi.fn(),
    findClientByIdRepository: {} as any
  }
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(factoryModule.makeGetClientByIdFactory).mockResolvedValue(mockUseCase as any)
    mockUseCase.execute.mockResolvedValue('result')
    mockUseCase.onFinish.mockResolvedValue(undefined)
  })

  it('calls use case and returns result', async () => {
    const params = { id: '123' }
    const result = await getClientById(params)
    expect(factoryModule.makeGetClientByIdFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ id: 123 })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('result')
  })

  it('throws if id is not a number', async () => {
    await expect(getClientById({ id: 'abc' })).rejects.toThrow('Id must be a number')
  })

  it('propagates errors from use case', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('fail'))
    await expect(getClientById({ id: '1' })).rejects.toThrow('fail')
  })
})

export {}
