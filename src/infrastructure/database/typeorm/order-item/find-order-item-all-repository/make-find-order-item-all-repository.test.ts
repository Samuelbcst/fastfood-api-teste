// Mock the OrderItemModel import from the correct path used in find-order-item-all-repository.ts
vi.mock("../model", () => ({
    OrderItemModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeFindOrderItemAllRepository } from "./make-find-order-item-all-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeFindOrderItemAllRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeFindOrderItemAllRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
