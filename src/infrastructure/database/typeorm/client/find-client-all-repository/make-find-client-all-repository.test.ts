// Mock the ClientModel import from the correct path used in find-client-all-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeFindClientAllRepository } from "./make-find-client-all-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeFindClientAllRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeFindClientAllRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
