import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./make-client-create-dependencies', () => ({ makeCreateClientFactory: vi.fn() }))
import * as factoryModule from './make-client-create-dependencies'
import { createClient } from './index'

export {}

describe('createClient', () => {
  const mockUseCase = {
    execute: vi.fn(),
    onFinish: vi.fn(),
    createClientRepository: {} as any
  }
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(factoryModule.makeCreateClientFactory).mockResolvedValue(mockUseCase as any)
    mockUseCase.execute.mockResolvedValue('result')
    mockUseCase.onFinish.mockResolvedValue(undefined)
  })

  it('validates input, calls use case, and returns result', async () => {
    const body = { name: 'n', email: 'a@b.com', cpf: '123' }
    const result = await createClient({}, body)
    expect(factoryModule.makeCreateClientFactory).toHaveBeenCalled()
    expect(mockUseCase.execute).toHaveBeenCalledWith(body)
    expect(mockUseCase.onFinish).toHaveBeenCalled()
    expect(result).toBe('result')
  })

  it('returns validation error if input is invalid', async () => {
    const body = { name: '', email: 'bad', cpf: '' }
    const result = await createClient({}, body)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
    expect((result.error as any)?.details).toBeDefined()
  })

  it('propagates non-validation errors', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('fail'))
    const result = await createClient({}, { name: 'n', email: 'a@b.com', cpf: '123' })
    expect(result.success).toBe(false)
    expect(result.result).toBeNull()
    expect(result.error).toBeDefined()
    if (result.error) {
      expect(result.error.message).toBe('fail')
      expect(result.error.code).toBe(500)
    }
  })
})

export {}
