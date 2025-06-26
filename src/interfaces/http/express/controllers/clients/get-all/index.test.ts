import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./make-client-get-all-dependencies', () => ({ makeGetClientAllFactory: vi.fn() }))
import * as factoryModule from './make-client-get-all-dependencies'
import { getClientAll } from './index'

describe('getClientAll', () => {
  const mockUseCase = {
    execute: vi.fn(),
    onFinish: vi.fn(),
    findClientAllRepository: {} as any
  }
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(factoryModule.makeGetClientAllFactory).mockResolvedValue(mockUseCase as any)
    mockUseCase.execute.mockResolvedValue('result')
    mockUseCase.onFinish.mockResolvedValue(undefined)
  })

  it('calls use case and returns result', async () => {
    const result = await getClientAll()
    expect(factoryModule.makeGetClientAllFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalled()
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('result')
  })

  it('propagates errors from use case', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('fail'))
    await expect(getClientAll()).rejects.toThrow('fail')
  })
})

export {}
