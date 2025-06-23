vi.mock("../model", () => ({ OrderModel: {} }))

import { describe, it, expect, vi } from "vitest"
import { makeUpdateOrderStatusRepository } from "./make-update-order-status-repository"

vi.mock("../..", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeUpdateOrderStatusRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeUpdateOrderStatusRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
