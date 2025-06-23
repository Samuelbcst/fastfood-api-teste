// Mock the OrderItemModel import from the correct path used in delete-order-item-repository.ts
vi.mock("../model", () => ({
    OrderItemModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeDeleteOrderItemRepository } from "./make-delete-order-item-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeDeleteOrderItemRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeDeleteOrderItemRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
