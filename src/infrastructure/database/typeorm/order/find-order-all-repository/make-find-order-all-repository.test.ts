// Mock the OrderModel import from the correct path used in find-order-all-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeFindOrderAllRepository } from "./make-find-order-all-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeFindOrderAllRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeFindOrderAllRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
