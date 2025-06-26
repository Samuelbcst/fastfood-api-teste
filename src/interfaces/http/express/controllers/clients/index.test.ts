import { describe, it, expect, vi } from 'vitest'

vi.mock('./get-by-id', () => ({ getClientById: vi.fn() }))
vi.mock('./get-all', () => ({ getClientAll: vi.fn() }))
vi.mock('./create', () => ({ createClient: vi.fn() }))
vi.mock('./update', () => ({ updateClient: vi.fn() }))
vi.mock('./delete', () => ({ deleteClient: vi.fn() }))
vi.mock('./get-by-cpf', () => ({ getClientByCpf: vi.fn() }))
vi.mock('../generic/run-express-endpoint', () => ({ runExpressEndpoint: vi.fn((fn, method) => fn) }))

import * as getById from './get-by-id'
import * as getAll from './get-all'
import * as create from './create'
import * as update from './update'
import * as del from './delete'
import * as getByCpf from './get-by-cpf'
import * as generic from '../../helpers/run-express-endpoint'
import clientRouter from './index'

export {}

describe('clientRouter', () => {
  it('should register all client routes with correct handlers', () => {
    // Check that runExpressEndpoint is called with correct handlers and methods
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getAll.getClientAll, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getById.getClientById, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getByCpf.getClientByCpf, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(create.createClient, 'post')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(update.updateClient, 'put')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(del.deleteClient, 'delete')
  })

  it('should export a router', () => {
    expect(clientRouter).toBeDefined()
    expect(typeof clientRouter.use).toBe('function')
    expect(typeof clientRouter.get).toBe('function')
    expect(typeof clientRouter.post).toBe('function')
    expect(typeof clientRouter.put).toBe('function')
    expect(typeof clientRouter.delete).toBe('function')
  })
})
