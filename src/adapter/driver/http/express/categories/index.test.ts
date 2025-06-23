import { describe, it, expect, vi } from 'vitest'

vi.mock('./get-by-id', () => ({ getCategoryById: vi.fn() }))
vi.mock('./get-all', () => ({ getCategoryAll: vi.fn() }))
vi.mock('./create', () => ({ createCategory: vi.fn() }))
vi.mock('./update', () => ({ updateCategory: vi.fn() }))
vi.mock('./delete', () => ({ deleteCategory: vi.fn() }))
vi.mock('../generic/run-express-endpoint', () => ({ runExpressEndpoint: vi.fn((fn, method) => fn) }))

import * as getById from './get-by-id'
import * as getAll from './get-all'
import * as create from './create'
import * as update from './update'
import * as del from './delete'
import * as generic from '../generic/run-express-endpoint'
import categoryRouter from './index'

export {}

describe('categoryRouter', () => {
  it('should register all category routes with correct handlers', () => {
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getAll.getCategoryAll, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getById.getCategoryById, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(create.createCategory, 'post')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(update.updateCategory, 'put')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(del.deleteCategory, 'delete')
  })

  it('should export a router', () => {
    expect(categoryRouter).toBeDefined()
    expect(typeof categoryRouter.use).toBe('function')
    expect(typeof categoryRouter.get).toBe('function')
    expect(typeof categoryRouter.post).toBe('function')
    expect(typeof categoryRouter.put).toBe('function')
    expect(typeof categoryRouter.delete).toBe('function')
  })
})
