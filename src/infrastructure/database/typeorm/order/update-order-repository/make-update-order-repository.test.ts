vi.mock("../model", () => ({ OrderModel: {} }))
vi.mock("../../category/model", () => ({ CategoryModel: {} }))
vi.mock("../../product/model", () => ({ ProductModel: {} }))
vi.mock("../../client/model", () => ({ ClientModel: {} }))
vi.mock("../../order-item/model", () => ({ OrderItemModel: {} }))

import { describe, it, expect, vi } from "vitest"
import { makeUpdateOrderRepository } from "./make-update-order-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeUpdateOrderRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeUpdateOrderRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
