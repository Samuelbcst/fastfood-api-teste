import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./make-client-get-by-cpf-dependencies', () => ({ makeGetClientByCpfFactory: vi.fn() }))
import * as factoryModule from './make-client-get-by-cpf-dependencies'
import { getClientByCpf } from './index'

describe('getClientByCpf', () => {
  const mockUseCase = {
    execute: vi.fn(),
    onFinish: vi.fn(),
    findClientByCpfRepository: {} as any
  }
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(factoryModule.makeGetClientByCpfFactory).mockResolvedValue(mockUseCase as any)
    mockUseCase.execute.mockResolvedValue('result')
    mockUseCase.onFinish.mockResolvedValue(undefined)
  })

  it('calls use case and returns result', async () => {
    const params = { cpf: '123' }
    const result = await getClientByCpf(params)
    expect(factoryModule.makeGetClientByCpfFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith({ cpf: '123' })
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('result')
  })

  it('throws if cpf is missing', async () => {
    await expect(getClientByCpf({})).rejects.toThrow('CPF is required')
  })

  it('propagates errors from use case', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('fail'))
    await expect(getClientByCpf({ cpf: '1' })).rejects.toThrow('fail')
  })
})

export {}
