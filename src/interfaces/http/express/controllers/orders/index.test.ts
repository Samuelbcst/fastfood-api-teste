import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./get-by-id', () => ({ getOrderById: vi.fn() }))
vi.mock('./get-all', () => ({ getOrderAll: vi.fn() }))
vi.mock('./create', () => ({ createOrder: vi.fn() }))
vi.mock('./update', () => ({ updateOrder: vi.fn() }))
vi.mock('./delete', () => ({ deleteOrder: vi.fn() }))
vi.mock('./get-by-client', () => ({ getOrderByClient: vi.fn() }))
vi.mock('./get-by-status', () => ({ getOrderByStatus: vi.fn() }))
vi.mock('../generic/run-express-endpoint', () => ({ runExpressEndpoint: vi.fn((fn, method) => fn) }))

import * as getById from './get-by-id'
import * as getAll from './get-all'
import * as create from './create'
import * as update from './update'
import * as del from './delete'
import * as getByClient from './get-by-client'
import * as getByStatus from './get-by-status'
import * as generic from '../../helpers/run-express-endpoint'
import orderRouter from './index'

export {}

describe('orderRouter', () => {
  it('should register all order routes with correct handlers', () => {
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getAll.getOrderAll, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getById.getOrderById, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(create.createOrder, 'post')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(update.updateOrder, 'put')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(del.deleteOrder, 'delete')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getByClient.getOrderByClient, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getByStatus.getOrderByStatus, 'get')
  })

  it('should export a router', () => {
    expect(orderRouter).toBeDefined()
    expect(typeof orderRouter.use).toBe('function')
    expect(typeof orderRouter.get).toBe('function')
    expect(typeof orderRouter.post).toBe('function')
    expect(typeof orderRouter.put).toBe('function')
    expect(typeof orderRouter.delete).toBe('function')
  })
})
