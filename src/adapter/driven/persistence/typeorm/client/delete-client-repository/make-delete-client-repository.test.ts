// Mock the ClientModel import from the correct path used in delete-client-repository.ts
vi.mock("../model", () => ({
    ClientModel: {},
}))

import { describe, it, expect, vi } from "vitest"
import { makeDeleteClientRepository } from "./make-delete-client-repository"

vi.mock("../../", () => ({
    default: {
        initialize: vi.fn().mockResolvedValue(undefined),
        getRepository: vi.fn().mockReturnValue({}),
    },
}))

describe("makeDeleteClientRepository", () => {
    it("should initialize datasource and return repository instance", async () => {
        const repo = await makeDeleteClientRepository()
        expect(repo).toBeDefined()
        expect(typeof repo.execute).toBe("function")
        expect(typeof repo.finish).toBe("function")
    })
})

export {}
