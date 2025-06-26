// Mock the OrderModel import from the correct path used in find-order-by-status-repository.ts
vi.mock("../model", () => ({
    OrderModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeFindOrderByStatusRepository } from "./make-find-order-by-status-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeFindOrderByStatusRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeFindOrderByStatusRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
