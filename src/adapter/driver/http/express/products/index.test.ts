import { describe, it, expect, vi } from 'vitest'

vi.mock('./get-by-id', () => ({ getProductById: vi.fn() }))
vi.mock('./get-all', () => ({ getProductAll: vi.fn() }))
vi.mock('./create', () => ({ createProduct: vi.fn() }))
vi.mock('./update', () => ({ updateProduct: vi.fn() }))
vi.mock('./delete', () => ({ deleteProduct: vi.fn() }))
vi.mock('./get-by-category', () => ({ getProductByCategory: vi.fn() }))
vi.mock('../generic/run-express-endpoint', () => ({ runExpressEndpoint: vi.fn((fn, method) => fn) }))

import * as getById from './get-by-id'
import * as getAll from './get-all'
import * as create from './create'
import * as update from './update'
import * as del from './delete'
import * as getByCategory from './get-by-category'
import * as generic from '../generic/run-express-endpoint'
import productRouter from './index'

describe('productRouter', () => {
  it('should register all product routes with correct handlers', () => {
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getAll.getProductAll, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getById.getProductById, 'get')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(create.createProduct, 'post')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(update.updateProduct, 'put')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(del.deleteProduct, 'delete')
    expect(generic.runExpressEndpoint).toHaveBeenCalledWith(getByCategory.getProductByCategory, 'get')
  })

  it('should export a router', () => {
    expect(productRouter).toBeDefined()
    expect(typeof productRouter.use).toBe('function')
    expect(typeof productRouter.get).toBe('function')
    expect(typeof productRouter.post).toBe('function')
    expect(typeof productRouter.put).toBe('function')
    expect(typeof productRouter.delete).toBe('function')
  })
})
export {}
