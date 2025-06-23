// Mock the OrderItemModel import from the correct path used in create-order-item-repository.ts
vi.mock("../model", () => ({
    OrderItemModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeCreateOrderItemRepository } from "./make-create-order-item-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeCreateOrderItemRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeCreateOrderItemRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.create).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
