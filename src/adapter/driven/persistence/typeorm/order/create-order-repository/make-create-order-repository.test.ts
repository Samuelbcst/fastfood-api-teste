// Mock the OrderModel import from the correct path used in create-order-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeCreateOrderRepository } from "./make-create-order-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeCreateOrderRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeCreateOrderRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.create).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
