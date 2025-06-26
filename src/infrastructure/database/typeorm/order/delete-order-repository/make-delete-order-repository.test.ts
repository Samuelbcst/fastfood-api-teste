// Mock the OrderModel import from the correct path used in delete-order-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeDeleteOrderRepository } from "./make-delete-order-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeDeleteOrderRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeDeleteOrderRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
